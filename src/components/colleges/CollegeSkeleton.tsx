export function CollegeSkeleton() {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/5 p-5 shadow-sm animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-black/10 dark:bg-white/10 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-black/10 dark:bg-white/10 rounded-md w-3/4" />
          <div className="h-4 bg-black/10 dark:bg-white/10 rounded-md w-1/2" />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-black/10 dark:bg-white/10 rounded-md" />
          <div className="h-6 w-16 bg-black/10 dark:bg-white/10 rounded-md" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 w-20 bg-black/10 dark:bg-white/10 rounded-md ml-auto" />
          <div className="h-6 w-24 bg-black/10 dark:bg-white/10 rounded-md ml-auto" />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <div className="h-8 w-8 bg-black/10 dark:bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
