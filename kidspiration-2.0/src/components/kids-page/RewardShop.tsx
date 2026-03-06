const rewards = [
  {
    name: "Cool Skateboard",
    cost: 600,
    icon: "skateboarding",
    color: "text-kids-blue",
    bg: "bg-kids-blue/10",
    locked: true,
    faded: false,
  },
  {
    name: "Artist Badge",
    cost: 500,
    icon: "palette",
    color: "text-kids-pink",
    bg: "bg-kids-pink/10",
    locked: true,
    faded: false,
  },
  {
    name: "Pet Dragon",
    cost: 1200,
    icon: "pets",
    color: "text-kids-orange",
    bg: "bg-kids-orange/10",
    locked: true,
    faded: true,
  },
];

export default function RewardShop() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border-b-8 border-primary relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-text-main dark:text-white flex items-center gap-2 font-display">
          <span className="material-symbols-outlined text-primary text-2xl">
            storefront
          </span>{" "}
          Reward Shop
        </h3>
        <a
          className="text-sm font-bold text-primary hover:text-primary-hover"
          href="#"
        >
          Visit Shop
        </a>
      </div>

      {/* Balance */}
      <div className="bg-primary-light/50 dark:bg-slate-800 p-4 rounded-2xl mb-4 text-center">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
          Your Balance
        </p>
        <div className="flex items-center justify-center gap-2 text-3xl font-black text-text-main dark:text-white">
          <span className="material-symbols-outlined text-primary text-3xl">
            stars
          </span>{" "}
          450
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
        Unlock Next:
      </h4>

      <div className="space-y-4">
        {rewards.map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm ${r.faded ? "opacity-60" : ""}`}
          >
            <div
              className={`w-16 h-16 ${r.bg} rounded-lg flex items-center justify-center shrink-0`}
            >
              <span className={`material-symbols-outlined text-3xl ${r.color}`}>
                {r.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-text-main dark:text-white text-sm truncate">
                {r.name}
              </h5>
              <div className="flex items-center gap-1 text-primary font-bold text-xs mt-0.5">
                <span className="material-symbols-outlined text-sm">stars</span>{" "}
                {r.cost}
              </div>
            </div>
            {r.locked && (
              <div className="shrink-0 pr-2">
                <span className="material-symbols-outlined text-slate-300">
                  lock
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-primary text-text-main font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-sm">
        View All Rewards
      </button>
    </div>
  );
}
