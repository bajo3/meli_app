// components/CompareBar.tsx
'use client';

type Props = {
  count: number;
  onOpen: () => void;
  onClear: () => void;
};

export default function CompareBar({ count, onOpen, onClear }: Props) {
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-6xl rounded-xl border border-white/10 bg-[#0b0b12]/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-200">Comparar <span className="font-semibold">({count})</span></p>
        <div className="flex items-center gap-2">
          <button onClick={onClear} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5">Limpiar</button>
          <button onClick={onOpen} className="rounded-lg border border-fuchsia-500 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-200 hover:bg-fuchsia-500/20">Abrir comparador</button>
        </div>
      </div>
    </div>
  );
}
