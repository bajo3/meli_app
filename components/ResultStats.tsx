// components/ResultStats.tsx
'use client';

type Props = {
  total: number;
  activeCount: number; // cuántos filtros (además de search/brand/order) hay activos
  onClear: () => void;
};

export default function ResultStats({ total, activeCount, onClear }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-slate-300">
        🎯 <span className="font-semibold">{total}</span> resultados
        {activeCount > 0 && (
          <span className="ml-2 text-xs text-fuchsia-300/90">• {activeCount} filtros activos</span>
        )}
      </p>
      <button
        onClick={onClear}
        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
