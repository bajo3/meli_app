export function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <div className="shimmer h-full w-full" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
