// components/FilterChips.tsx
'use client';

export type QuickFilters = {
  used?: boolean;
  zeroKm?: boolean;
  automatic?: boolean;
  fuelNafta?: boolean;
  fuelDiesel?: boolean;
  kmMax?: number | null;
  yearMin?: number | null;
};

type Props = {
  value: QuickFilters;
  onChange: (next: QuickFilters) => void;
};

function Chip({ active, onClick, children }: {active:boolean; onClick:()=>void; children:React.ReactNode}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs ${active?'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-200':'border-white/10 text-slate-200 hover:bg-white/5'}`}
    >
      {children}
    </button>
  );
}

export default function FilterChips({ value, onChange }: Props) {
  const toggle = (k: keyof QuickFilters, v?: any) => {
    const next = { ...value } as any;
    if (v === undefined) next[k] = !value[k as keyof QuickFilters];
    else next[k] = value[k as keyof QuickFilters] === v ? null : v;
    onChange(next);
  };

  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1.5">
      <Chip active={!!value.used} onClick={() => toggle('used')}>Usado</Chip>
      <Chip active={!!value.zeroKm} onClick={() => toggle('zeroKm')}>0 KM</Chip>
      <Chip active={!!value.automatic} onClick={() => toggle('automatic')}>Automática</Chip>
      <Chip active={!!value.fuelNafta} onClick={() => toggle('fuelNafta')}>Nafta</Chip>
      <Chip active={!!value.fuelDiesel} onClick={() => toggle('fuelDiesel')}>Diésel</Chip>
      <Chip active={value.kmMax === 60000} onClick={() => onChange({ ...value, kmMax: value.kmMax===60000?null:60000 })}>
        ≤ 60.000 KM
      </Chip>
      <Chip active={value.yearMin === 2020} onClick={() => onChange({ ...value, yearMin: value.yearMin===2020?null:2020 })}>
        Año ≥ 2020
      </Chip>
    </div>
  );
}
