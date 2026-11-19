export default function LoadingPost() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-grow w-full">
      <div className="mb-6">
        <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm animate-pulse">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="h-3 w-16 bg-amber-100 rounded" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>

          <div className="space-y-3 mb-6">
            <div className="h-8 w-full bg-slate-200 rounded" />
            <div className="h-8 w-3/4 bg-slate-200 rounded" />
          </div>

          <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-200" />
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2.5">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-11/12 bg-slate-100 rounded" />
              <div className="h-4 w-4/5 bg-slate-100 rounded" />
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 w-32 bg-slate-200 rounded mb-6" />
            <div className="space-y-5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="h-6 w-5 bg-slate-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-full bg-slate-200 rounded" />
                    <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
            <div className="h-4 w-40 bg-slate-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-100 rounded" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}