export default function Stats() {
  return (
    <div className="w-full bg-primary/10 py-12 px-4 dark:bg-stone-800/50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-20 text-center">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black text-primary mb-1">10k+</span>
          <span className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300">
            Happy Kids
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black text-primary mb-1">500+</span>
          <span className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300">
            Groups
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black text-primary mb-1">100%</span>
          <span className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300">
            Safe Fun
          </span>
        </div>
      </div>
    </div>
  );
}

// TODO: Fetch stats from API