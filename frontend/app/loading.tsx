export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse"
            >
              <div className="h-3 w-20 bg-slate-200 rounded mb-4" />
              <div className="h-6 w-full bg-slate-200 rounded mb-2" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-4" />
              <div className="h-4 w-full bg-slate-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg border border-slate-200 p-6 h-64 animate-pulse" />
        </div>
      </div>
    </div>
  );
}