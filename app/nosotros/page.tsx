import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros - Mi Concesionario',
};

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Sobre Nosotros
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-center text-slate-300">
          Somos una empresa familiar dedicada a la compra y venta de vehículos con
          años de experiencia en el rubro automotor. Nuestro objetivo es
          acompañarte en todo el proceso, brindándote asesoramiento profesional y
          transparencia para que encuentres el vehículo ideal para vos.
        </p>

        {/* Características de la empresa */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-[#111118] p-6 shadow-md shadow-black/40">
            <h2 className="mb-2 text-xl font-semibold text-fuchsia-400">Experiencia</h2>
            <p className="text-sm text-slate-300">
              Contamos con más de 10 años en el mercado, sumando conocimiento y
              confianza a cada operación.
            </p>
          </div>
          <div className="rounded-xl bg-[#111118] p-6 shadow-md shadow-black/40">
            <h2 className="mb-2 text-xl font-semibold text-fuchsia-400">Multimarca</h2>
            <p className="text-sm text-slate-300">
              Ofrecemos una amplia variedad de marcas y modelos para que puedas
              elegir el que mejor se adapte a tus necesidades.
            </p>
          </div>
          <div className="rounded-xl bg-[#111118] p-6 shadow-md shadow-black/40">
            <h2 className="mb-2 text-xl font-semibold text-fuchsia-400">Atención Personalizada</h2>
            <p className="text-sm text-slate-300">
              Nos esforzamos en brindarte una atención cercana y profesional para
              que tu experiencia sea única.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
