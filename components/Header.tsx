import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#05030a] border-b border-fuchsia-800/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-white">
          {/* In a real project you could replace this with a logo image */}
          Mi Concesionario
        </Link>
        {/* Navigation links */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-slate-300 hover:text-white transition-colors">
            Catálogo
          </Link>
          <Link href="/nosotros" className="text-slate-300 hover:text-white transition-colors">
            Nosotros
          </Link>
          <Link href="/contacto" className="text-slate-300 hover:text-white transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
