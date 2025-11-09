// app/catalogo/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';
import VehicleDetailClient from './VehicleDetailClient';
import type { Vehicle } from '../../../lib/fetchVehicles';

type PageProps = {
  params: { slug: string };
};

export default async function VehicleDetailPage({ params }: PageProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, anonKey);

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (error) {
    console.error('Error cargando vehículo:', error);
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#05030a] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Vehículo no encontrado.</p>
          <a href="/catalogo" className="text-fuchsia-400 hover:underline">
            ← Volver al catálogo
          </a>
        </div>
      </main>
    );
  }

  return <VehicleDetailClient vehicle={data as Vehicle} />;
}
