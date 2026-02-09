export default function StoreLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-white/20" />
          <div className="mt-3 h-5 w-64 animate-pulse rounded-lg bg-white/10" />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar skeleton */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="mb-6 h-10 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-8 animate-pulse rounded-lg bg-gray-100" />
                ))}
              </div>
            </aside>

            {/* Product grid skeleton */}
            <div className="flex-1">
              <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="aspect-[2/1] animate-pulse bg-gray-200" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                      <div className="flex justify-between">
                        <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
