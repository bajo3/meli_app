// app/catalogo/CatalogoClient.tsx
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Vehicle } from '../catalogo/page';

type Props = {
  vehicles: Vehicle[];
};

export default function CatalogoClient({ vehicles }: Props) {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState<'all' | string>('all');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // Sacamos el listado de marcas únicas
  const brands = useMemo(() => {
    const set = new Set<string>();
    vehicles.forEach(v => {
      if (v.brand) set.add(v.brand);
    });
    return Array.from(set).sort();
  }, [vehicles]);

  const filtered = useMemo(() => {
    let list = [...vehicles];

    // Filtro por búsqueda (título + marca)
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(v => {
        const text = `${v.title ?? ''} ${v.brand ?? ''}`.toLowerCase();
        return text.includes(q);
      });
    }

    // Filtro por marca
    if (brand !== 'all') {
      list = list.filter(v => v.brand === brand);
    }

    // Orden por precio
    list.sort((a, b) => {
      const pa = a.price ?? 0;
      const pb = b.price ?? 0;
      return order === 'asc' ? pa - pb : pb - pa;
    });

    return list;
  }, [vehicles, search, brand, order]);

  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-8">
        {/* Header */}
        <header className="flex flex-col gap-3 border-b border-fuchsia-700/40 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              Catálogo de vehículos
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Vehículos sincronizados automáticamente desde Mercado Libre.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://wa.me/5492494XXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-fuchsia-600 px-3 py-1.5 text-sm font-medium text-fuchsia-300 hover:bg-fuchsia-600/30 transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </header>

        {/* Filtros */}
        <section className="flex flex-col gap-3 rounded-xl bg-[#111118] p-3 shadow-md shadow-black/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Buscar por modelo, marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-fuchsia-700/40 bg-[#05030a] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 md:max-w-xs"
            />

            <select
              className="w-full rounded-lg border border-fuchsia-700/40 bg-[#05030a] px-3 py-2 text-sm text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 md:w-44"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            >
              <option value="all">Todas las marcas</option>
              {brands.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Orden:</span>
            <select
              className="rounded-lg border border-fuchsia-700/40 bg-[#05030a] px-3 py-2 text-sm text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              value={order}
              onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </div>
        </section>

        {/* Grid de vehículos */}
        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-slate-400">
            No se encontraron vehículos con los filtros seleccionados.
          </p>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(vehicle => {
              const mainPicture =
                (vehicle.pictures && vehicle.pictures[0]) || null;

              return (
                <a
                  key={vehicle.id}
                  href={`/catalogo/${vehicle.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-fuchsia-700/40 bg-[#111118] shadow-md shadow-black/40 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-[#05030a]">
                    {mainPicture ? (
                      <Image
                        src={mainPicture}
                        alt={vehicle.title}
                        width={400}
                        height={300}
                        className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                        Sin foto
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-sm font-semibold text-white">
                        {vehicle.title}
                      </h2>
                      {vehicle.price !== null && (
                        <span className="whitespace-nowrap text-right text-base font-bold text-fuchsia-400">
                          $
                          {vehicle.price.toLocaleString('es-AR', {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">
                      {vehicle.brand || 'Sin marca'}
                      {vehicle.year ? ` · ${vehicle.year}` : ''}
                    </p>

                    <button
                      type="button"
                      className="mt-auto inline-flex items-center justify-center rounded-lg border border-fuchsia-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors group-hover:border-fuchsia-500 group-hover:text-white"
                    >
                      Ver en Mercado Libre
                    </button>
                  </div>
                </a>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
