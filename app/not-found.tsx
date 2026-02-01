import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-fuchsia-300">404</h1>
        <p className="text-slate-300">
          No encontramos la página que buscás.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500 transition"
          >
            Ir al inicio
          </Link>
          <Link
            href="/catalogo"
            className="rounded-lg border border-fuchsia-700/60 px-4 py-2 text-sm font-semibold text-fuchsia-200 hover:bg-fuchsia-900/30 transition"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
