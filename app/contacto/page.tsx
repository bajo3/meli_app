import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Jesús Díaz Automotores',
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100">
      {/* HERO */}
      <section className="relative px-4 py-16 md:py-20">
        {/* Glow de fondo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.22),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.22),_transparent_60%)] opacity-80" />

        <div className="relative mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]">
            Contacto
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-300">
            ¿Tenés alguna consulta, querés ver un auto o coordinar una visita?
            Estamos disponibles para ayudarte por los canales que prefieras.
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="relative px-4 pb-16">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
          {/* COLUMNA IZQUIERDA: DATOS + ACCIONES */}
          <div className="space-y-6">
            {/* Tarjeta de datos de contacto */}
            <div className="rounded-2xl border border-fuchsia-800/50 bg-[#0b0a13] p-6 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
              <h2 className="mb-3 text-xl md:text-2xl font-semibold text-fuchsia-300 flex items-center gap-2">
                <span>📍</span>
                <span>Datos de contacto</span>
              </h2>

              <ul className="space-y-2 text-sm md:text-[0.95rem]">
                <li>
                  <span className="font-semibold text-slate-200">Dirección:</span>{' '}
                  <span className="text-slate-300">
                    Piedrabuena 1578, Tandil, Buenos Aires
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-slate-200">Teléfonos:</span>{' '}
                  <a
                    href="tel:+542494587046"
                    className="text-fuchsia-400 hover:text-fuchsia-200 hover:underline"
                  >
                    2494 587046
                  </a>{' '}
                  ·{' '}
                  <a
                    href="tel:+542494541756"
                    className="text-fuchsia-400 hover:text-fuchsia-200 hover:underline"
                  >
                    2494 541756
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-200">Email:</span>{' '}
                  <a
                    href="mailto:jesusdiazautomotores@gmail.com"
                    className="text-fuchsia-400 hover:text-fuchsia-200 hover:underline"
                  >
                    jesusdiazautomotores@gmail.com
                  </a>
                </li>
              </ul>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/5492494587046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(244,114,182,0.5)] hover:bg-fuchsia-500 transition"
                >
                  💬 Escribir por WhatsApp
                </a>
                <a
                  href="tel:+542494587046"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition"
                >
                  📞 Llamar ahora
                </a>
              </div>
            </div>

            {/* Horarios + redes */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/60 bg-[#0b0a13] p-5">
                <h3 className="mb-2 text-lg font-semibold text-fuchsia-300 flex items-center gap-2">
                  <span>🕒</span>
                  <span>Horarios de atención</span>
                </h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>Lunes a viernes: 9:00 a 12:30 · 16:00 a 19:30</li>
                  <li>Sábados: 9:00 a 13:00</li>
                  <li className="text-xs text-slate-400 mt-2">
                    También podés escribirnos por WhatsApp fuera de horario y te
                    respondemos a la brevedad.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#0b0a13] p-5">
                <h3 className="mb-2 text-lg font-semibold text-fuchsia-300 flex items-center gap-2">
                  <span>🌐</span>
                  <span>Redes sociales</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.instagram.com/jesusdiazautomotores"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-fuchsia-300 transition"
                    >
                      <span>📸</span>
                      <span>@jesusdiazautomotores</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/jesusdiazautomotores"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-fuchsia-300 transition"
                    >
                      <span>📘</span>
                      <span>Facebook oficial</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/5492494587046"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-fuchsia-300 transition"
                    >
                      <span>💬</span>
                      <span>Canal directo por WhatsApp</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: MAPA / UBICACIÓN */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-fuchsia-800/50 bg-[#0b0a13] p-4 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
              <h2 className="mb-3 text-lg md:text-xl font-semibold text-fuchsia-300 flex items-center gap-2">
                <span>📍</span>
                <span>Cómo llegar</span>
              </h2>
              <p className="text-sm text-slate-300 mb-3">
                Estamos en una zona de fácil acceso en Tandil. Podés acercarte en
                vehículo particular o transporte urbano.
              </p>
              <div className="h-64 w-full overflow-hidden rounded-xl border border-slate-800/70">
                <iframe
                  title="Ubicación"
                  src="https://maps.google.com/maps?q=Piedrabuena%201578%20Tandil&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                <a
                  href="https://maps.google.com/?q=Piedrabuena%201578%20Tandil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 hover:bg-slate-900 transition"
                >
                  🧭 Abrir en Google Maps
                </a>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1">
                  🚗 Estacionamiento en la zona
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/60 bg-[#0b0a13] p-4 text-xs text-slate-400">
              <p>
                Tip: si ya viste un vehículo en el catálogo que te interesa, podés
                enviarnos el link de la publicación de Mercado Libre o la ficha de
                nuestra web por WhatsApp y seguimos la conversación desde ahí.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
