"use client";

export default function StatusBadge({
  state,
}: {
  state: "disponible" | "reserva" | "vendido";
}) {
  if (state === "disponible") return null;
  const txt = state === "reserva" ? "RESERVADO" : "VENDIDO";
  const color = state === "reserva" ? "bg-amber-500" : "bg-emerald-600";

  return (
    <div
      className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full ${color} px-3 py-1 text-[10px] font-black text-white tracking-widest`}
    >
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
      {txt}
    </div>
  );
}
