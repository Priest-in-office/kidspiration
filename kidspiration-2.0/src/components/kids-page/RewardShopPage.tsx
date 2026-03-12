import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKids } from "../../context/KidsContext";
import {
  REWARDS,
  CATEGORY_META,
  getRewardsByCategory,
} from "../../data/rewards";
import type { Reward } from "../../types/kids";

type CategoryFilter = Reward["category"] | "all";

export default function RewardShopPage() {
  const { sparks, unlockedRewards, spendSparks, unlockReward } = useKids();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [confirmReward, setConfirmReward] = useState<Reward | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);

  const displayedRewards =
    activeFilter === "all" ? REWARDS : getRewardsByCategory(activeFilter);

  const handlePurchase = (reward: Reward) => {
    if (unlockedRewards.includes(reward.id)) return;
    if (sparks < reward.cost) return;
    setConfirmReward(reward);
  };

  const confirmPurchase = () => {
    if (!confirmReward) return;
    const success = spendSparks(confirmReward.cost);
    if (success) {
      unlockReward(confirmReward.id);
      setJustUnlocked(confirmReward.id);
      setTimeout(() => setJustUnlocked(null), 2000);
    }
    setConfirmReward(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950 font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-3 border-b-4 border-primary shadow-sm">
        <button
          onClick={() => navigate("/kids")}
          className="flex items-center gap-2 text-text-muted dark:text-slate-400 hover:text-text-main dark:hover:text-white font-bold transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Dashboard
        </button>
        <h1 className="text-xl font-black text-text-main dark:text-white">
          🏪 Reward Shop
        </h1>
        <div className="flex items-center gap-2 bg-primary-light dark:bg-slate-800 px-4 py-2 rounded-full">
          <span className="material-symbols-outlined text-primary text-lg">
            stars
          </span>
          <span className="font-black text-text-main dark:text-white">
            {sparks}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* Balance card */}
        <div className="bg-linear-to-r from-amber-400 to-yellow-300 rounded-3xl p-8 mb-8 text-center shadow-xl">
          <p className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-1">
            Your Spark Balance
          </p>
          <div className="flex items-center justify-center gap-3 text-5xl font-black text-white drop-shadow-md">
            <span className="material-symbols-outlined text-5xl">stars</span>
            {sparks}
          </div>
          <p className="text-sm font-bold text-amber-700 mt-2">
            Earn more by playing games and completing challenges!
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              activeFilter === "all"
                ? "bg-primary text-text-main shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Items
          </button>
          {(Object.keys(CATEGORY_META) as Reward["category"][]).map((cat) => {
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                  activeFilter === cat
                    ? "bg-primary text-text-main shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {meta.icon}
                </span>
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Rewards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedRewards.map((reward) => {
            const isOwned = unlockedRewards.includes(reward.id);
            const canAfford = sparks >= reward.cost;
            const isJustBought = justUnlocked === reward.id;

            return (
              <div
                key={reward.id}
                className={`
                  relative bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border-2 transition-all duration-300
                  ${isOwned ? "border-kids-green/40 bg-kids-green/5" : "border-slate-100 dark:border-slate-800"}
                  ${isJustBought ? "animate-bounce border-kids-green scale-105" : ""}
                  ${!isOwned && canAfford ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : ""}
                `}
                onClick={() => !isOwned && canAfford && handlePurchase(reward)}
              >
                {/* Owned badge */}
                {isOwned && (
                  <div className="absolute top-2 right-2 bg-kids-green text-white text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                    Owned
                  </div>
                )}

                {/* Icon */}
                <div className="text-center mb-3">
                  <span className="material-symbols-outlined text-4xl text-kids-blue">
                    {reward.icon}
                  </span>
                </div>

                {/* Name */}
                <h4 className="font-black text-text-main dark:text-white text-sm text-center truncate">
                  {reward.name}
                </h4>

                {/* Category label */}
                <p className="text-[10px] font-bold text-text-muted dark:text-slate-500 text-center mt-0.5 uppercase tracking-wider">
                  {CATEGORY_META[reward.category].label}
                </p>

                {/* Description */}
                <p className="text-xs text-text-muted dark:text-slate-400 text-center mt-2 line-clamp-2">
                  {reward.description}
                </p>

                {/* Cost / Status */}
                <div className="mt-3 text-center">
                  {isOwned ? (
                    <span className="text-xs font-bold text-kids-green flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        verified
                      </span>
                      Unlocked
                    </span>
                  ) : (
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-black ${
                        canAfford
                          ? "bg-primary text-text-main hover:bg-primary-hover transition-colors"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        stars
                      </span>
                      {reward.cost}
                      {!canAfford && (
                        <span className="material-symbols-outlined text-sm ml-1">
                          lock
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Confirmation modal */}
      {confirmReward && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
            <span className="material-symbols-outlined text-6xl text-kids-blue block mb-4">
              {confirmReward.icon}
            </span>
            <h3 className="text-2xl font-black text-text-main dark:text-white mb-2">
              Unlock {confirmReward.name}?
            </h3>
            <p className="text-sm text-text-muted dark:text-slate-400 mb-6">
              {confirmReward.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-black text-primary mb-6">
              <span className="material-symbols-outlined">stars</span>
              {confirmReward.cost} sparks
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmReward(null)}
                className="flex-1 py-3 px-4 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 py-3 px-4 rounded-2xl font-black bg-primary text-text-main hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
