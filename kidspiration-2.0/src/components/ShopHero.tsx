export default function ShopHero() {
  return (
    <div className="relative w-full py-16 px-4 md:px-10 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            Gear Up for{" "}
            <span className="text-primary relative inline-block">
              Adventures
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
            !
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto md:mx-0 font-medium">
            Check out our latest collection of tees, hoodies, and caps designed
            to spark joy and creativity in every kiddo.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-primary text-slate-900 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
              Shop All
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              View Categories
            </button>
          </div>
        </div>

        {/* Featured image */}
        <div className="flex-1 relative">
          <div className="relative z-10 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-500 group">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 relative">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-blue-300/20 mix-blend-multiply" />
              <img
                alt="Happy kids wearing colorful t-shirts"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfQtEHRvNPnr9iDKWD4Q_N3ixrevCyamwBfPuNC2jfgZf607x1RPucMsFqiElN8c-evrvHQn4evNHUagnEQ6IYzT6vTgW58G6heASSVGu7uWgvCz2Co0JwhxdMhlanoRGwwe6g693LKuraCNloIKBIlJbFsqCdTkq_FownA13jgGnf5znQvEQsVRuT69Adrrh8Q1OdLdetAGWPDtvl1M3n11V1iqLPjemVGRRWyIaCpZI_tC4oCn8yMaKsmH-L7CfeTQNSurrGcaau"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-500 text-white size-24 rounded-full flex flex-col items-center justify-center shadow-lg transform rotate-12 border-4 border-white dark:border-slate-800">
              <span className="text-xs font-bold uppercase">Start at</span>
              <span className="text-2xl font-black">$12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
