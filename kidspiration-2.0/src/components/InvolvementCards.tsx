import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    icon: "groups",
    title: "The Last Child Challenge",
    description:
      "We are on the race to reach the last child with the Healing to the Nations Magazine for Kids.",
  },
  {
    icon: "volunteer_activism",
    title: "Support the Mission",
    description:
      "Donate or volunteer your time to help our events succeed. Small acts of kindness ripple outwards.",
  },
  {
    icon: "campaign",
    title: "Lead a Group",
    description:
      "Start a local Kidspiration chapter in your neighborhood. We provide the tools, you provide the passion.",
  },
];

export default function InvolvementCards() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 px-4 py-16 @container">
      {/* Header */}
      <div className="flex flex-col gap-6 text-center items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl">
            Ways to Get Involved
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal max-w-[720px]">
            Every step you take helps build a stronger community for our kids.
            Choose the path that suits you best.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 p-0">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-1 gap-4 rounded-2xl border border-[#e8e2ce] dark:border-[#3a3525] bg-white dark:bg-[#1a170d] p-6 flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-3xl">
                {card.icon}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
            <button
              onClick={() => {
                if (card.title === "Support the Mission")
                  navigate("/partner/donate");
              }}
              className="mt-auto pt-4 text-primary font-bold text-sm hover:underline flex items-center gap-1 self-start"
            >
              Learn more{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/partner/donate")}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-primary hover:bg-yellow-400 text-slate-900 text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg"
        >
          <span className="truncate">See Full Details</span>
        </button>
      </div>
    </div>
  );
}
