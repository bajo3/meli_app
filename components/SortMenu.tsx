// components/SortMenu.tsx
'use client';

type Props = {
  sort: 'price-asc'|'price-desc'|'year-desc'|'km-asc'|'recent';
  onSort: (v: Props['sort']) => void;
  view: 'grid'|'list';
  onView: (v: 'grid'|'list') => void;
  density: 'comfy'|'compact';
  onDensity: (v: 'comfy'|'compact') => void;
};

export default function SortMenu({ sort, onSort, view, onView, density, onDensity }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as Props['sort'])}
        className="rounded-lg border border-white/10 bg-[#05030a] px-3 py-2 text-xs text-slate-100"
      >
        <option value="price-asc">Precio ↑</option>
        <option value="price-desc">Precio ↓</option>
        <option value="year-desc">Año ↓</option>
        <option value="km-asc">KM ↑</option>
        <option value="recent">Más recientes</option>
      </select>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onView('grid')}
          className={`rounded-lg border px-3 py-2 text-xs ${view==='grid'?'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 text-slate-200 hover:bg-white/5'}`}
        >
          Grid
        </button>
        <button
          onClick={() => onView('list')}
          className={`rounded-lg border px-3 py-2 text-xs ${view==='list'?'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 text-slate-200 hover:bg-white/5'}`}
        >
          Lista
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDensity('comfy')}
          className={`rounded-lg border px-3 py-2 text-xs ${density==='comfy'?'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 text-slate-200 hover:bg-white/5'}`}
        >
          Cómoda
        </button>
        <button
          onClick={() => onDensity('compact')}
          className={`rounded-lg border px-3 py-2 text-xs ${density==='compact'?'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 text-slate-200 hover:bg-white/5'}`}
        >
          Compacta
        </button>
      </div>
    </div>
  );
}
