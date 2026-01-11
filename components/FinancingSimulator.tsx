'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function fmtMoney(n: number) {
  return n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
}

type QuoteOption = { plazo: number; cuota: number };

type Props = {
  price: number;
  title?: string;
};

export default function FinancingSimulator({ price, title }: Props) {
  const MIN_DOWN_PCT = 60;
  const [downPct, setDownPct] = useState<number>(MIN_DOWN_PCT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<QuoteOption[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const downAmount = useMemo(() => Math.round((price * downPct) / 100), [price, downPct]);
  const amountToFinance = useMemo(() => Math.max(0, price - downAmount), [price, downAmount]);

  const invalid = downPct < MIN_DOWN_PCT;

  async function simulate() {
    if (invalid) return;
    if (amountToFinance <= 0) {
      setOptions([]);
      setSummary('Con entrega del 100%, no necesitás financiar.');
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const res = await fetch('/api/creditcar/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, amountToFinance }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setOptions(null);
        setError(data?.error ?? 'No se pudo simular la financiación.');
        return;
      }

      setOptions(Array.isArray(data.options) ? data.options : []);
      setSummary(data.summaryText ?? null);
    } catch (e: any) {
      setOptions(null);
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-black/35 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] text-slate-400 uppercase tracking-[0.2em]">Simular financiación</p>
          <p className="mt-1 text-sm text-white/90">
            Entrega mínima <span className="text-white font-semibold">{MIN_DOWN_PCT}%</span> · Financiación máxima{' '}
            <span className="text-white font-semibold">40%</span>
          </p>
          {title && <p className="mt-1 text-xs text-slate-400 line-clamp-1">{title}</p>}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={simulate}
          disabled={loading || invalid}
          className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15 disabled:opacity-50"
        >
          {loading ? 'Simulando...' : 'Simular'}
        </motion.button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-black/25 p-3">
          <p className="text-[0.7rem] text-slate-400 uppercase tracking-[0.2em]">Entrega</p>
          <p className="mt-1 text-lg font-bold text-white">$ {fmtMoney(downAmount)}</p>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={MIN_DOWN_PCT}
              max={100}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full accent-fuchsia-500"
            />
            <span className="w-12 text-right text-sm text-white">{downPct}%</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Si bajás de {MIN_DOWN_PCT}% se bloquea la simulación.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/25 p-3">
          <p className="text-[0.7rem] text-slate-400 uppercase tracking-[0.2em]">A financiar</p>
          <p className="mt-1 text-lg font-bold text-white">$ {fmtMoney(amountToFinance)}</p>
          <p className="mt-2 text-[11px] text-slate-400">
            Este es el monto estimado que se envía a Creditcar para calcular las cuotas.
          </p>
        </div>
      </div>

      {invalid && (
        <p className="mt-3 text-xs text-amber-300">
          Entrega mínima {MIN_DOWN_PCT}%. Ajustá el deslizador para simular.
        </p>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-300">
          {error}
        </p>
      )}

      {summary && (
        <p className="mt-3 text-xs text-slate-300 whitespace-pre-line">{summary}</p>
      )}

      {Array.isArray(options) && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {options.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-black/25 p-3 text-xs text-slate-300">
              No hay opciones para mostrar.
            </div>
          ) : (
            options.map((o) => (
              <div key={o.plazo} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <p className="text-[0.7rem] text-slate-400 uppercase tracking-[0.2em]">{o.plazo} cuotas</p>
                <p className="mt-1 text-base font-bold text-white">$ {fmtMoney(o.cuota)}</p>
                <p className="mt-1 text-[11px] text-slate-400">Aprox. (confirmar condiciones)</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
