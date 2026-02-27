import healingStreamsImg from "../assets/HSLHS_MARCH_2026.jpg";

export default function HealingStreams() {
  return (
    <div className="@container w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 lg:px-20 lg:py-24 max-w-7xl mx-auto">
        {/* Image — matches Hero image size & hover behavior */}
        <div className="lg:w-1/2 relative flex justify-center items-center">
          <div className="absolute top-0 left-10 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30"></div>
          <div className="relative w-full aspect-[4/3] max-w-md lg:max-w-full rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={healingStreamsImg}
              alt="Healing Streams Live Healing Services with Pastor Chris - March 2026"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2 z-10">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>March 13–15, 2026</span>
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text-main dark:text-white sm:text-4xl lg:text-5xl">
            Get Ready for the Largest{" "}
            <span className="text-primary underline decoration-wavy decoration-4 underline-offset-4">
              Healing Crusade
            </span>{" "}
            on Earth
          </h2>
          <p className="text-lg font-normal leading-relaxed text-text-muted dark:text-stone-300 max-w-xl mx-auto lg:mx-0">
            Healing Streams Live Healing Services with Pastor Chris. Experience
            the miraculous — join billions around the world for three days of
            faith, healing, and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
            <a
              href="https://healingstreams.tv/kids"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-stone-900 shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:-translate-y-1"
            >
              <span className="truncate">Register Now</span>
              <span className="material-symbols-outlined ml-2">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
