import { useKids } from "../../context/KidsContext";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const { streak, playerName } = useKids();

  return (
    <section className="w-full px-6 py-8 lg:px-10 lg:py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kids-blue/10 text-kids-blue font-bold text-sm mb-2">
            <span className="material-symbols-outlined text-base">
              waving_hand
            </span>
            {greeting}!
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white tracking-tight font-display">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-kids-orange">
              {playerName}!
            </span>
          </h2>
          <p className="mt-2 text-lg text-text-muted font-medium max-w-xl dark:text-slate-400 font-sans">
            Ready to unleash your spark today? We have new games and videos
            waiting for you.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 px-6 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined">calendar_month</span>
            Daily Streak: {streak}
          </button>
          <button
            onClick={() => navigate("/kids/avatar")}
            className="bg-kids-blue text-white font-bold py-3 px-6 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg shadow-kids-blue/30 flex items-center gap-2 hover:-translate-y-1"
          >
            <span className="material-symbols-outlined">add_reaction</span>
            Customize Avatar
          </button>
        </div>
      </div>
    </section>
  );
}
