// lib/fetchVehicles.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import slugify from 'slugify';
import { getValidAccessToken } from './meliAuth';

export interface Vehicle {
  id: string;
  title: string;
  brand: string | null;
  year: number | null;
  price: number | null;
  slug: string;
  pictures: string[];
  permalink: string;

  // columnas extra en Supabase (con mayúsculas)
  Km: number | null;
  Motor: string | null;
  Caja: string | null;
  Combustible: string | null;
  Puertas: number | null;
}

function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

/**
 * Lee atributos de ML y saca marca, año, km, motor, caja, combustible, puertas.
 */
function extractVehicleDetails(attributes: any[]): {
  brand: string | null;
  year: number | null;
  Km: number | null;
  Motor: string | null;
  Caja: string | null;
  Combustible: string | null;
  Puertas: number | null;
} {
  let brand: string | null = null;
  let year: number | null = null;
  let Km: number | null = null;
  let Motor: string | null = null;
  let Caja: string | null = null;
  let Combustible: string | null = null;
  let Puertas: number | null = null;

  for (const attr of attributes || []) {
    const key = (attr.id || attr.name || '').toString().toUpperCase();
    const value: string = (attr.value_name ?? '').toString();

    if (!brand && (key.includes('BRAND') || key.includes('MARCA'))) {
      brand = value || null;
    }

    if (!year && (key.includes('YEAR') || key.includes('AÑO') || key.includes('ANO'))) {
      const parsed = parseInt(value, 10);
      year = Number.isNaN(parsed) ? null : parsed;
    }

    if (!Km && (key.includes('KILOMET') || key.includes('KM'))) {
      const parsed = parseInt(value.replace(/\D/g, ''), 10);
      Km = Number.isNaN(parsed) ? null : parsed;
    }

    if (!Motor && key.includes('MOTOR')) {
      Motor = value || null;
    }

    if (!Caja && key.includes('TRANSMIS')) {
      Caja = value || null;
    }

    if (!Combustible && (key.includes('COMBUSTIBLE') || key.includes('FUEL'))) {
      Combustible = value || null;
    }

    if (!Puertas && (key.includes('PUERTA') || key.includes('DOOR'))) {
      const parsed = parseInt(value.replace(/\D/g, ''), 10);
      Puertas = Number.isNaN(parsed) ? null : parsed;
    }
  }

  return { brand, year, Km, Motor, Caja, Combustible, Puertas };
}

/**
 * Normaliza un item de ML al formato Vehicle.
 */
function normalizeItem(item: any): Vehicle {
  const { brand, year, Km, Motor, Caja, Combustible, Puertas } =
    extractVehicleDetails(item.attributes || []);

  const slug = slugify(item.title, { lower: true, strict: true });

  const pictures: string[] = [];
  if (Array.isArray(item.pictures)) {
    for (const pic of item.pictures) {
      if (pic && pic.url) pictures.push(pic.url);
    }
  }

  return {
    id: item.id,
    title: item.title,
    brand,
    year,
    price: item.price ?? null,
    slug,
    pictures,
    permalink: item.permalink,
    Km,
    Motor,
    Caja,
    Combustible,
    Puertas,
  };
}

/**
 * Trae todos los vehículos de ML y los guarda/actualiza en Supabase.
 */
export async function fetchAndStoreVehicles(): Promise<{ count: number }> {
  const supabase = getSupabase();
  const accessToken = await getValidAccessToken();
  const userId = process.env.MELI_USER_ID;

  if (!userId) {
    throw new Error('MELI_USER_ID must be defined');
  }

  const allItemIds: string[] = [];
  let offset = 0;
  const limit = 50;

  // 1) IDs de items activos
  while (true) {
    const searchUrl = new URL(`https://api.mercadolibre.com/users/${userId}/items/search`);
    searchUrl.searchParams.set('status', 'active');
    searchUrl.searchParams.set('limit', String(limit));
    searchUrl.searchParams.set('offset', String(offset));

    const searchResp = await fetch(searchUrl.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!searchResp.ok) {
      throw new Error(`Failed to fetch items: ${searchResp.status} ${searchResp.statusText}`);
    }

    const searchData = await searchResp.json();
    const results: string[] = searchData.results || [];
    allItemIds.push(...results);

    if (results.length < limit) break;
    offset += limit;
  }

  if (allItemIds.length === 0) {
    console.log('No se encontraron items activos.');
    return { count: 0 };
  }

  // 2) Detalles en batches
  const vehicles: Vehicle[] = [];
  const batchSize = 20;

  for (let i = 0; i < allItemIds.length; i += batchSize) {
    const batchIds = allItemIds.slice(i, i + batchSize);

    const detailsUrl = new URL('https://api.mercadolibre.com/items');
    detailsUrl.searchParams.set('ids', batchIds.join(','));
    detailsUrl.searchParams.set(
      'attributes',
      'id,title,price,attributes,pictures,permalink'
    );

    const detailsResp = await fetch(detailsUrl.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!detailsResp.ok) {
      throw new Error(
        `Failed to fetch item details: ${detailsResp.status} ${detailsResp.statusText}`
      );
    }

    const detailsData = await detailsResp.json();

    for (const itemWrapper of detailsData || []) {
      const item = itemWrapper.body || itemWrapper;
      if (!item) continue;
      vehicles.push(normalizeItem(item));
    }
  }

  // 3) upsert en Supabase
  const { error } = await supabase.from('vehicles').upsert(vehicles, {
    onConflict: 'id',
  });

  if (error) {
    throw error;
  }

  return { count: vehicles.length };
}
