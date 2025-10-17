export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Hero Section Skeleton */}
        <div className="rounded-xl p-8 md:p-12 mb-8 border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 skeleton"></div>
            <div className="flex-1 w-full">
              <div className="h-10 skeleton mb-4 w-3/4"></div>
              <div className="h-6 skeleton mb-2 w-full"></div>
              <div className="h-6 skeleton w-2/3"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <div className="h-6 skeleton mb-4 w-1/3"></div>
                <div className="h-4 skeleton mb-2 w-full"></div>
                <div className="h-4 skeleton mb-2 w-full"></div>
                <div className="h-4 skeleton w-2/3"></div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <div className="h-6 skeleton mb-4 w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 skeleton w-full"></div>
                  <div className="h-4 skeleton w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
