import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-10 border-t border-fuchsia-800/40 bg-[#05030a] text-sm text-slate-300">
      {/* Glow / textura de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.2),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_60%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.06] bg-[url('/textures/noise.png')]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-6">
        {/* Strip superior con logo + CTA */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/jda-logo.png"
              alt="Jesús Díaz Automotores"
              width={120}
              height={40}
              className="h-9 w-auto object-contain drop-shadow-[0_0_20px_rgba(244,114,182,0.35)]"
            />
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-fuchsia-300">
                Jesús Díaz Automotores
              </p>
              <p className="text-xs text-slate-400">
                Autos seleccionados • Atención personalizada • Catálogo conectado a Mercado Libre
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5492494587046"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/70 bg-fuchsia-600/10 px-4 py-2 text-xs font-semibold text-fuchsia-100 shadow-[0_0_25px_rgba(244,114,182,0.35)] transition hover:bg-fuchsia-500/30 hover:border-fuchsia-400"
          >
            <span className="text-base">💬</span>
            <span>Escribinos por WhatsApp</span>
          </a>
        </div>

        {/* Grilla principal */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contacto */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-white">Contacto</h2>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>📍 Piedrabuena 1578, Tandil</li>
              <li>📞 2494-587046</li>
              <li>📞 2494-541756</li>
              <li>✉️ jesusdiazautomotores@gmail.com</li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-white">Horario</h2>
            <p className="text-xs sm:text-sm">
              Lunes a Viernes <br />
              <span className="text-slate-200">9:00 – 13:00</span> y{' '}
              <span className="text-slate-200">16:00 – 20:00</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm">
              Sábado <span className="text-slate-200">9:00 – 13:00</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[0.7rem] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ¡Cotiza tu proximo auto con nosotros!
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-white">Explorar</h2>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-white">Seguinos</h2>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <a
                href="https://www.instagram.com/jesusdiazautomotores"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 hover:border-fuchsia-400 hover:bg-fuchsia-500/10 hover:text-white transition-colors"
              >
                <span>📸</span>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/jesusdiazautomotores"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 hover:border-fuchsia-400 hover:bg-fuchsia-500/10 hover:text-white transition-colors"
              >
                <span>📘</span>
                <span>Facebook</span>
              </a>
              <a
                href="https://wa.me/5492494621182"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 hover:border-fuchsia-400 hover:bg-fuchsia-500/10 hover:text-white transition-colors"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Strip inferior */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-[0.7rem] text-slate-500 sm:flex-row">
          <span>
            © {year} Jesús Díaz Automotores. Todos los derechos reservados.
          </span>
          <span className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-fuchsia-400" />
            <span>Sitio en actualización constante.</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
