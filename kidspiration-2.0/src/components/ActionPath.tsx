const STEPS = [
  {
    icon: "handshake",
    title: "Connect",
    description: "Join our network and meet like-minded community leaders.",
  },
  {
    icon: "favorite",
    title: "Support",
    description: "Contribute resources or time to help our mission grow.",
  },
  {
    icon: "flag",
    title: "Lead",
    description: "Start a local chapter and guide others in your area.",
  },
];

export default function ActionPath() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-12">
        Your Action Path
      </h2>
      <div className="relative max-w-3xl mx-auto">
        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:flex justify-between items-start relative z-10">
          {/* Dashed connector */}
          <div className="absolute top-[28px] left-0 w-full h-[2px] border-t-2 border-dashed border-slate-300 dark:border-slate-600 -z-10" />

          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-4 w-1/3 group"
            >
              <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border-4 border-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {step.icon}
                </span>
              </div>
              <div className="text-center px-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                  Step {i + 1}
                </p>
                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden flex flex-col gap-8 relative">
          <div className="absolute left-[27px] top-0 h-full w-[2px] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -z-10" />

          {STEPS.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 relative">
              <div className="w-14 h-14 min-w-[3.5rem] rounded-full bg-white dark:bg-slate-800 border-4 border-primary flex items-center justify-center shadow-md z-10">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {step.icon}
                </span>
              </div>
              <div className="pt-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Step {i + 1}
                </p>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
