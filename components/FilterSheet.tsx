// components/FilterSheet.tsx
'use client';

import { useEffect } from 'react';

export type AdvancedFilters = {
  priceMin?: number | null;
  priceMax?: number | null;
  yearMin?: number | null;
  yearMax?: number | null;
  kmMax?: number | null;
  transmission: Set<'Manual'|'Automática'>;
  fuel: Set<'Nafta'|'Diésel'|'GNC'|'Híbrido'>;
  state: Set<'disponible'|'reserva'|'vendido'>;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  value: AdvancedFilters;
  onChange: (v: AdvancedFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

function ToggleTag({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs ${
        active
          ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200'
          : 'border-white/10 text-slate-200 hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}


export default function FilterSheet({ open, onOpenChange, value, onChange, onApply, onClear }: Props) {
  // ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const setNum = (k: keyof AdvancedFilters, v: string) => {
    const n = v === '' ? null : Number(v);
    onChange({ ...value, [k]: Number.isNaN(n) ? null : n });
  };

  const toggleSet = <K extends keyof AdvancedFilters, T extends string>(k: K, item: T) => {
    const set = new Set(value[k] as any as Set<T>);
    if (set.has(item)) set.delete(item); else set.add(item);
    onChange({ ...value, [k]: set as any });
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      {/* sheet */}
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl rounded-t-2xl border border-white/10 bg-[#0b0b12] p-4 shadow-xl sm:bottom-auto sm:left-4 sm:top-4 sm:h-[calc(100vh-2rem)] sm:w-[360px] sm:rounded-2xl sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Filtros avanzados</h3>
          <button onClick={() => onOpenChange(false)} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5">Cerrar</button>
        </div>

        {/* Precio */}
        <section className="space-y-2 border-b border-white/5 pb-4">
          <p className="text-xs text-slate-400">Precio (ARS)</p>
          <div className="flex items-center gap-2">
            <input inputMode="numeric" placeholder="min" value={value.priceMin ?? ''} onChange={(e)=>setNum('priceMin', e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs" />
            <span className="text-slate-500">—</span>
            <input inputMode="numeric" placeholder="max" value={value.priceMax ?? ''} onChange={(e)=>setNum('priceMax', e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs" />
          </div>
        </section>

        {/* Año */}
        <section className="space-y-2 border-b border-white/5 py-4">
          <p className="text-xs text-slate-400">Año</p>
          <div className="flex items-center gap-2">
            <input inputMode="numeric" placeholder="desde" value={value.yearMin ?? ''} onChange={(e)=>setNum('yearMin', e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs" />
            <span className="text-slate-500">—</span>
            <input inputMode="numeric" placeholder="hasta" value={value.yearMax ?? ''} onChange={(e)=>setNum('yearMax', e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs" />
          </div>
        </section>

        {/* KM */}
        <section className="space-y-2 border-b border-white/5 py-4">
          <p className="text-xs text-slate-400">KM (máx.)</p>
          <input type="number" inputMode="numeric" placeholder="e.g. 60000" value={value.kmMax ?? ''} onChange={(e)=>setNum('kmMax', e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs" />
        </section>

        {/* Transmisión */}
        <section className="space-y-2 border-b border-white/5 py-4">
          <p className="text-xs text-slate-400">Transmisión</p>
          <div className="flex flex-wrap gap-2">
            {(['Manual','Automática'] as const).map(t=>(
              <ToggleTag key={t} active={value.transmission.has(t)} onClick={()=>toggleSet('transmission', t)}>{t}</ToggleTag>
            ))}
          </div>
        </section>

        {/* Combustible */}
        <section className="space-y-2 border-b border-white/5 py-4">
          <p className="text-xs text-slate-400">Combustible</p>
          <div className="flex flex-wrap gap-2">
            {(['Nafta','Diésel','GNC','Híbrido'] as const).map(f=>(
              <ToggleTag key={f} active={value.fuel.has(f)} onClick={()=>toggleSet('fuel', f)}>{f}</ToggleTag>
            ))}
          </div>
        </section>

        {/* Estado */}
        <section className="space-y-2 py-4">
          <p className="text-xs text-slate-400">Estado</p>
          <div className="flex flex-wrap gap-2">
            {(['disponible','reserva','vendido'] as const).map(s=>(
              <ToggleTag key={s} active={value.state.has(s)} onClick={()=>toggleSet('state', s)}>{s}</ToggleTag>
            ))}
          </div>
        </section>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={onClear} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5">Limpiar</button>
          <button onClick={() => { onApply(); onOpenChange(false); }} className="rounded-lg border border-fuchsia-500 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold text-fuchsia-200 hover:bg-fuchsia-500/20">Aplicar</button>
        </div>
      </div>
    </div>
  );
}
