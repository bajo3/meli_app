// components/VehicleCard.tsx
'use client';

import Image from 'next/image';

type Props = {
  title: string;
  href: string;
  cover: string;
  price: string;
  meta?: string; // “Fiat · 2017”
  badges?: string[]; // [“USADO”, “40.000 KM”, “AT”]
  ribbon?: 'disponible'|'reserva'|'vendido';
  dense?: boolean;
};

export default function VehicleCard({ title, href, cover, price, meta, badges = [], ribbon, dense }: Props) {
  const ribbonStyle =
    ribbon === 'vendido' ? 'bg-red-600/80'
    : ribbon === 'reserva' ? 'bg-amber-500/80'
    : 'bg-emerald-600/80';
  const pad = dense ? 'p-3' : 'p-4';

  return (
    <a href={href} className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111118] shadow-md shadow-black/40 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden bg-[#05030a]">
        <Image src={cover} alt={title} width={600} height={400} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {/* overlay de puntitos */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.04)_1px)] bg-[size:6px_6px]" />
        {/* ribbon */}
        {ribbon && (
          <span className={`absolute left-2 top-2 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${ribbonStyle}`}>
            {ribbon}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-2 ${pad}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-white ${dense?'text-sm line-clamp-1':'text-sm md:text-base line-clamp-2'}`}>{title}</h3>
          <span className="whitespace-nowrap text-right text-base font-bold text-fuchsia-400">{price}</span>
        </div>

        {meta && <p className="text-xs text-slate-400">{meta}</p>}

        {badges.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {badges.map((b, i) => (
              <span key={i} className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-slate-300">{b}</span>
            ))}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-fuchsia-300">
          Ver más <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}
