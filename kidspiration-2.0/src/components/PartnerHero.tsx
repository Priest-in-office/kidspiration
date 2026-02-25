import { useNavigate } from "react-router-dom";

export default function PartnerHero() {
  const navigate = useNavigate();

  return (
    <div className="@container">
      <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row items-center">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-lg @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-1/2"
          role="img"
          aria-label="Happy diverse group of children playing outdoors"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3NwV8y3TqaArywz6n-MLB5czAFfD5_Gm3PunJODY_VWzd582IsnjE424fjxnM4HEe-z0yOPzUu6pWZntPpAgckbyrVtxPP__H4WF8Zf7nF62n4mtF54xq5hhdIOa7YRuvzmMp6OA9a2TkuxMZF7KQcOT_qpXDUNrdOHZRfaKkvnHDofaBgZ_bDKh_qOGZbNgzZy0JcaFsTrziSVNZpuBymotul7OP06PF8P6Y1fzV24TgvBQ2icE_zvlb4ytzWR9g0jCf2Vjv5TFw")',
          }}
        />
        <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center @[864px]:w-1/2">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
              Partner with Us to Inspire Kids
            </h1>
            <h2 className="text-slate-600 dark:text-slate-300 text-sm font-normal leading-normal @[480px]:text-base mt-2">
              Join the Kidspiration movement and help shape the future for our
              children. Whether you're a parent, leader, or friend, there's a
              place for you in our playful journey.
            </h2>
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary hover:bg-yellow-400 text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base transition-all shadow-md hover:shadow-lg"
          >
            <span className="truncate">Start Your Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
}
