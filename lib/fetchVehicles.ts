// lib/fetchVehicles.ts
import { getValidAccessToken } from './meliAuth';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import slugify from 'slugify';

export interface Vehicle {
  id: string;
  title: string;
  brand: string | null;
  year: number | null;
  price: number | null;
  slug: string;
  pictures: string[];
  permalink: string;
}

function extractVehicleDetails(attributes: any[]): {
  brand: string | null;
  year: number | null;
} {
  let brand: string | null = null;
  let year: number | null = null;

  for (const attr of attributes || []) {
    const key = (attr.id || attr.name || '').toString().toUpperCase();
    if (!brand && (key.includes('BRAND') || key.includes('MARCA'))) {
      brand = attr.value_name;
    }
    if (!year && (key.includes('YEAR') || key.includes('ANO') || key.includes('AÑO'))) {
      const parsed = parseInt(attr.value_name);
      year = isNaN(parsed) ? null : parsed;
    }
  }

  return { brand, year };
}

function normalizeItem(item: any): Vehicle {
  const { brand, year } = extractVehicleDetails(item.attributes || []);
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
  };
}

function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

/**
 * Busca todos los items activos del seller en ML y los guarda en la tabla vehicles.
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

  while (true) {
    const searchUrl = new URL(`https://api.mercadolibre.com/users/${userId}/items/search`);
    searchUrl.searchParams.set('status', 'active');
    searchUrl.searchParams.set('limit', limit.toString());
    searchUrl.searchParams.set('offset', offset.toString());
    // usamos el token como query param aca:
    searchUrl.searchParams.set('access_token', accessToken);

    const searchResp = await fetch(searchUrl.toString());
    if (!searchResp.ok) {
      throw new Error(`Failed to fetch items: ${searchResp.status} ${searchResp.statusText}`);
    }

    const searchData = await searchResp.json();
    const results: string[] = searchData.results || [];
    allItemIds.push(...results);

    if (results.length < limit) {
      break;
    }

    offset += limit;
  }

  if (allItemIds.length === 0) {
    console.log('No se encontraron items activos para ese usuario');
    return { count: 0 };
  }

  const vehicles: Vehicle[] = [];
  const batchSize = 20;

  for (let i = 0; i < allItemIds.length; i += batchSize) {
    const batchIds = allItemIds.slice(i, i + batchSize);

    const detailsUrl = new URL('https://api.mercadolibre.com/items');
    detailsUrl.searchParams.set('ids', batchIds.join(','));
    detailsUrl.searchParams.set('attributes', 'id,title,price,attributes,pictures,permalink');

    const detailsResp = await fetch(detailsUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 👈 ACÁ VA EL TOKEN
      },
    });

    if (!detailsResp.ok) {
      throw new Error(`Failed to fetch item details: ${detailsResp.status} ${detailsResp.statusText}`);
    }

    const detailsData = await detailsResp.json();

    for (const itemWrapper of detailsData) {
      const item = itemWrapper.body || itemWrapper;
      vehicles.push(normalizeItem(item));
    }
  }

  const { error } = await supabase.from('vehicles').upsert(vehicles, {
    onConflict: 'id',
  });

  if (error) {
    throw error;
  }

  return { count: vehicles.length };
}
