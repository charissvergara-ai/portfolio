export default function ProductLoading() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="aspect-[3/2] animate-pulse rounded-2xl bg-gray-200" />

          {/* Details skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="flex gap-4">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-5 w-32 animate-pulse rounded bg-gray-100" />
            </div>
            <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            </div>
            <div className="h-14 w-full animate-pulse rounded-full bg-gray-200" />
            <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
