import KidsHeader from "../components/kids-page/KidsHeader";
import WelcomeBanner from "../components/kids-page/WelcomeBanner";
import DailyChallenge from "../components/kids-page/DailyChallenge";
// import WatchAndLearn from "../components/kids-page/WatchAndLearn";
import GameZone from "../components/kids-page/GameZone";
// import MagazineSection from "../components/kids-page/MagazineSection";
import RewardShop from "../components/kids-page/RewardShop";
import WeeklyActivity from "../components/kids-page/WeeklyActivity";

export default function KidsDashboard() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-slate-950 text-text-main font-display antialiased overflow-x-clip">
      <KidsHeader />

      <main className="flex flex-col grow kids-dashboard-bg">
        <WelcomeBanner />

        <div className="px-6 pb-12 lg:px-10 lg:pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content — 8 columns */}
          <div className="lg:col-span-8 space-y-12">
            <DailyChallenge />
            {/* <WatchAndLearn /> */}
            <GameZone />
            {/* <MagazineSection /> */}
          </div>

          {/* Sidebar — 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <RewardShop />
            <WeeklyActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
