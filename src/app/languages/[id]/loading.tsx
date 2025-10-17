export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 skeleton"></div>
          <span>/</span>
          <div className="h-4 w-24 skeleton"></div>
          <span>/</span>
          <div className="h-4 w-32 skeleton"></div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="rounded-xl p-8 md:p-12 mb-8 border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 skeleton"></div>
            <div className="flex-1 w-full space-y-4">
              <div className="h-10 skeleton w-3/4"></div>
              <div className="h-6 skeleton w-full"></div>
              <div className="h-6 skeleton w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-5 skeleton w-32"></div>
                <div className="h-5 skeleton w-40"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <div className="h-6 skeleton mb-4 w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 skeleton w-full"></div>
                  <div className="h-4 skeleton w-full"></div>
                  <div className="h-4 skeleton w-2/3"></div>
                </div>
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

        {/* Navigation Skeleton */}
        <div className="flex justify-between mt-12 pt-8 border-t">
          <div className="h-10 skeleton w-32"></div>
          <div className="h-10 skeleton w-32"></div>
        </div>
      </div>
    </div>
  );
}
