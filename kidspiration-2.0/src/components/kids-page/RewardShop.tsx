import { Link } from "react-router-dom";
import { useKids } from "../../context/KidsContext";
import { REWARDS } from "../../data/rewards";

export default function RewardShop() {
  const { sparks, unlockedRewards } = useKids();

  // Show the 3 cheapest rewards the user hasn't unlocked yet
  const nextRewards = REWARDS.filter((r) => !unlockedRewards.includes(r.id))
    .sort((a, b) => a.cost - b.cost)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border-b-8 border-primary relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-text-main dark:text-white flex items-center gap-2 font-display">
          <span className="material-symbols-outlined text-primary text-2xl">
            storefront
          </span>{" "}
          Reward Shop
        </h3>
        <Link
          className="text-sm font-bold text-primary hover:text-primary-hover"
          to="/kids/rewards"
        >
          Visit Shop
        </Link>
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
          {sparks}
        </div>
      </div>

      {/* Unlocked count */}
      {unlockedRewards.length > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-kids-green">
          <span className="material-symbols-outlined text-sm">verified</span>
          {unlockedRewards.length} / {REWARDS.length} rewards unlocked
        </div>
      )}

      <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
        Unlock Next:
      </h4>

      <div className="space-y-4">
        {nextRewards.map((r) => {
          const canAfford = sparks >= r.cost;
          return (
            <div
              key={r.id}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-kids-blue">
                  {r.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-text-main dark:text-white text-sm truncate">
                  {r.name}
                </h5>
                <div className="flex items-center gap-1 text-primary font-bold text-xs mt-0.5">
                  <span className="material-symbols-outlined text-sm">
                    stars
                  </span>{" "}
                  {r.cost}
                </div>
              </div>
              <div className="shrink-0 pr-2">
                {canAfford ? (
                  <span className="material-symbols-outlined text-kids-green">
                    lock_open
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-slate-300">
                    lock
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to="/kids/rewards"
        className="w-full mt-4 bg-primary text-text-main font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-sm block text-center"
      >
        View All Rewards
      </Link>
    </div>
  );
}
