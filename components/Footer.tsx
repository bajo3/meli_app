import Link from 'next/link';

export default function Footer() {
  // Get the current year at runtime so the footer stays up‑to‑date.
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#05030a] border-t border-fuchsia-800/40 pt-10 pb-6 text-slate-400 text-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contact details */}
        <div>
          <h2 className="mb-2 text-base font-semibold text-white">Contacto</h2>
          <ul className="space-y-1">
            <li>📍 Piedrabuena 1578, Tandil</li>
            <li>📞 2494‑587046</li>
            <li>📞 2494‑541756</li>
            <li>✉️ jesusdiazautomotores@gmail.com</li>
          </ul>
        </div>
        {/* Opening hours */}
        <div>
          <h2 className="mb-2 text-base font-semibold text-white">Horario</h2>
          <p>Lunes a Viernes 9:00 – 13:00 y 16:00 – 20:00</p>
          <p>Sábado 9:00 – 13:00</p>
        </div>
        {/* Navigation links again for convenience */}
        <div>
          <h2 className="mb-2 text-base font-semibold text-white">Explorar</h2>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="hover:text-white">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-white">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        {/* Social media links */}
        <div>
          <h2 className="mb-2 text-base font-semibold text-white">Seguinos</h2>
          <ul className="flex gap-4">
            <li>
              <a
                href="https://www.instagram.com/jesusdiazautomotores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/jesusdiazautomotores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5492494587046"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs">
        © {year} Mi Concesionario. Todos los derechos reservados.
      </div>
    </footer>
  );
}
