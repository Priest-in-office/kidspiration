export default function Hero() {
  return (
    <div className="@container w-full bg-hero-pattern">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 lg:px-20 lg:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2 z-10">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 dark:bg-stone-800 dark:text-primary">
            <span className="material-symbols-outlined text-sm">
              celebration
            </span>
            <span>New Adventures Added!</span>
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white sm:text-5xl lg:text-6xl">
            Unleash Your{" "}
            <span className="text-primary underline decoration-wavy decoration-4 underline-offset-4">
              Spark!
            </span>
          </h1>
          <p className="text-lg font-normal leading-relaxed text-text-muted dark:text-stone-300 max-w-xl mx-auto lg:mx-0">
            A safe, colorful, and creative community where kids design, learn,
            and grow together while parents and leaders guide the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
            <button className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-stone-900 shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:-translate-y-1">
              <span className="truncate">Join the Fun</span>
              <span className="material-symbols-outlined ml-2">
                rocket_launch
              </span>
            </button>
            <button className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-white border border-stone-200 px-8 text-base font-bold text-text-main shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:bg-stone-700">
              <span className="truncate">Watch Video</span>
              <span className="material-symbols-outlined ml-2">
                play_circle
              </span>
            </button>
          </div>
        </div>
        {/* Hero Image */}
        <div className="lg:w-1/2 relative flex justify-center items-center">
          <div className="absolute top-0 right-10 w-24 h-24 bg-purple-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30"></div>
          <div
            className="relative w-full aspect-[4/3] max-w-md lg:max-w-full rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            data-alt="Group of diverse happy children jumping and playing in a park"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk2v2HVNIOaAdJkrxrmsdahObsCNIU281a0B0pkCv3tcJzQ8aUycCNQPJPuYy2qpg9lPp5TZ2i8-TEIAcLDQLvEewpZIuzccuMyYOk_iTahhII39VHDmVhLvdNlaJmSfbD7hjZTaDBUgO1Kq4xvBYC-RF08X7lZMrM1KIpSJzOq6Tfz6ImvslyETwiHpCNtFeMI83UDD3uYuyPzqMJZdisTF9QG7WZlgf2i435_ej6XTKxmXN7sjEiJopLmx6lK2nkhK_ivLGNbUVY')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-bold text-lg">Daily Challenges</p>
              <p className="text-sm opacity-90">Join 10k+ explorers today!</p>
            </div>
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-6 -left-4 lg:left-0 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full text-green-600 dark:text-green-300">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div>
              <p className="text-xs text-text-muted dark:text-stone-400 font-bold uppercase">
                Safety First
              </p>
              <p className="text-sm font-bold text-text-main dark:text-white">
                Moderated 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
