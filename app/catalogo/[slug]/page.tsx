import { createClient } from '@supabase/supabase-js';
import VehicleDetailClient from './VehicleDetailClient';

// Always render fresh data so vehicle pages don't stay cached when stock changes in ML.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  // ⚠️ IMPORTANTE: usamos el ANON KEY para leer (no el service role)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Traemos TODAS las columnas de la fila
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (error) {
    console.error('Error cargando vehículo:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Error cargando el vehículo
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Vehículo no encontrado
      </div>
    );
  }

  // Debug fuerte del lado del server (se ve en la consola de Node)
  console.log('Vehicle desde Supabase (server):', data);

  return <VehicleDetailClient vehicle={data} />;
}
