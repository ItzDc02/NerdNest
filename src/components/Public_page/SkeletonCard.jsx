export default function SkeletonCard() {
  return (
    <div
      className="rounded border p-4 shadow-sm bg-slate-100 dark:bg-slate-700 animate-pulse"
    >
      <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-600 rounded mb-3"></div>
      <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-600 rounded"></div>
    </div>
  );
}
