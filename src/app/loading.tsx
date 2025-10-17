export default function Loading() {
  return (
    <div className="bg-background">
      {/* Hero Section Skeleton */}
      <section className="container py-16 text-center">
        <div className="h-12 md:h-16 skeleton mb-6 max-w-4xl mx-auto"></div>
        <div className="h-6 skeleton mb-4 max-w-2xl mx-auto"></div>
        <div className="h-6 skeleton mb-8 max-w-xl mx-auto"></div>

        <div className="flex justify-center gap-4 mb-8">
          <div className="h-12 w-40 skeleton"></div>
          <div className="h-12 w-40 skeleton"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-50 mt-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 skeleton"></div>
          ))}
        </div>
      </section>

      {/* Featured Languages Grid Skeleton */}
      <section id="languages" className="container py-16">
        <div className="h-8 skeleton mb-12 max-w-md mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 skeleton"></div>
                  <div className="flex-1">
                    <div className="h-6 skeleton mb-2 w-3/4"></div>
                    <div className="h-4 skeleton w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 skeleton w-full"></div>
                  <div className="h-4 skeleton w-full"></div>
                  <div className="h-4 skeleton w-2/3"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 skeleton w-20"></div>
                  <div className="h-6 skeleton w-20"></div>
                  <div className="h-6 skeleton w-20"></div>
                </div>
                <div className="h-10 skeleton w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section Skeleton */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-10 skeleton mb-2 max-w-xs mx-auto"></div>
                <div className="h-4 skeleton max-w-xs mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
