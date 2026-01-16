export default function LoadingVehicle() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="h-3 w-56 rounded bg-white/10" />

        <div className="mt-6 flex flex-col items-start gap-8 lg:flex-row">
          {/* Left: Gallery skeleton */}
          <section className="w-full space-y-4 lg:w-1/2">
            <div className="relative w-full max-w-[560px] mx-auto aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="absolute inset-0 animate-pulse bg-white/10" />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 w-24 sm:h-20 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="h-full w-full animate-pulse bg-white/10" />
                </div>
              ))}
            </div>
          </section>

          {/* Right: Details skeleton */}
          <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-1/2">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="mt-4 h-8 w-3/4 rounded bg-white/10" />
            <div className="mt-3 h-4 w-1/2 rounded bg-white/10" />

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-white/10" />
                  <div className="h-4 w-32 rounded bg-white/10" />
                </div>
              ))}
            </div>

            <div className="mt-8 h-10 w-full rounded-xl bg-white/10" />
            <div className="mt-3 h-10 w-full rounded-xl bg-white/10" />
          </section>
        </div>
      </div>
    </main>
  );
}
