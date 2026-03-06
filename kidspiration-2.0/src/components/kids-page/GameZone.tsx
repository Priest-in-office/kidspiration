const games = [
  {
    name: "Math Blaster",
    tag: "Educational",
    tagColor: "kids-green",
    bgColor: "kids-green",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0bVqNW1O8s-Ec1mVOglQwy1c-HRQi95oy11pDm1_fsdtf4jz__j2oYBp16CACyVdQbQbvUChskBGvYLaau4i0dZtc5bU2rd0eW1tBrXCIPyAsvCiD1hVT3l3tnZYEQG-Zp3eoCuZ1M5AP7_xBzG0RCsoMrJrt7wK-VgcFB4g4-HiFI4uM5rL02o1jHIz4VwMJHyLn1w6eitGZpPJvq-NtItOItZCUvq9YW6PW-jyvizPrRSGIA-p5JJoAfEIzSQKSlTdb_OMKRr8f",
  },
  {
    name: "Space Explorer",
    tag: "Adventure",
    tagColor: "kids-blue",
    bgColor: "kids-blue",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA70ydNnGHNgLce5UO5unp0NmhGkB0G57CcMxV7GPXlYhVEtdYiTfpLpHTzw3b4SJiAGuzifK_uaQ7S6Hy4OUjbzRGfhzQgt17YX9u3IjkcnpwrVBm5agfpnFgPOxOGvLVuKSjuGYADO7zD6rLqr6nwURTi-POg2mWdOflD_zcjh61LKuWVJK0YrhPTldD35X6tE9RJmIBJG0LOonwHdo5MnOOOcHGI2eqjGvdueVlOqJSsFApXIMXIEKyA6TspNoLczXD-Id-gH4X3",
  },
  {
    name: "Color Match",
    tag: "Puzzle",
    tagColor: "kids-pink",
    bgColor: "kids-pink",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAY6lfgtev2lCL8z0dNd4uo6xn0oi_u0FkO-Dfhl_WzLFl79KWLqwL42oGOC5Fb50Jh_pmcolQKXpsH26ySNNyknun7equvdNC_N-sOEmfXsqwqd_8CIqEGotpdgRpkV4cap--b9cCZseOXZDPdElfsfIlzza62WQKtLFZ2PlLhHxv56QibkK5GhMzuZPjaKSJ8TzbzqWxsHVjfLfi6lFPwFqBtkY_hIqyTa_nLvutTEPo339kEiknbPVe-81OSs-J_8fxAzUVrpQCN",
  },
  {
    name: "Dino Run",
    tag: "Action",
    tagColor: "kids-orange",
    bgColor: "kids-orange",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCORmS8m7zAXoEnojdN1MMZ1_XXAxLRP0aNC0asj-L3NQAtKMrUKo1-rAKTOh1gpILgtIpJTq31AhPYllwU1gdVHXsWiqRZAEx9fVXKcr1qo_d-w4qWiybr2IajaFsy_syLNCLMOU1Ny2Uvu8ZTW_5KZRRYDa5WFCTCutob41tdcJZhYShfcBesaTedvhvEEJaXzsywYODjyQPkg_h8CLA6xeJrTsWSL_SYAd2Q27aXtvYDJzHv-VbPJN3VD48Iv8UVjJ7_DQiJ8xpN",
  },
  {
    name: "Word Scramble",
    tag: "Word Game",
    tagColor: "primary",
    bgColor: "primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuy1UCstniKG_b1f0uwNZwUmNiufO4NrxghhhVLevk6lxmvHfAjMm1gF08vCFXCqdqVC_cKKDrNxRHKOexs1zb4L8e0WBtKtov7-r30u3Nn9z40KKBBwsvrKHrmSpEMz1E5s2wb2SMYCRjWnew2rqxjBCG1-UgIBIAYEtVFKC61fM6ZssfMowRqouTbCvNOn5bQONWPdSfLz7fpf9zm9jBMCVMLdUvYmlcDCU1anS9yesSlTMQeBpbO_AwT0h7p6bPIjM5TRUbESE5",
  },
];

// Map dynamic color tokens to actual class strings so Tailwind can detect them
const colorMap: Record<string, { bg: string; text: string; tagBg: string }> = {
  "kids-green": {
    bg: "bg-kids-green/10",
    text: "text-kids-green",
    tagBg: "bg-kids-green/10",
  },
  "kids-blue": {
    bg: "bg-kids-blue/10",
    text: "text-kids-blue",
    tagBg: "bg-kids-blue/10",
  },
  "kids-pink": {
    bg: "bg-kids-pink/10",
    text: "text-kids-pink",
    tagBg: "bg-kids-pink/10",
  },
  "kids-orange": {
    bg: "bg-kids-orange/10",
    text: "text-kids-orange",
    tagBg: "bg-kids-orange/10",
  },
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    tagBg: "bg-primary/10",
  },
};

export default function GameZone() {
  return (
    <section className="bg-primary/5 rounded-3xl p-6 border-2 border-primary/20 dark:bg-slate-800/50 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-kids-orange/20 p-2.5 rounded-xl text-kids-orange">
            <span className="material-symbols-outlined text-3xl">
              sports_esports
            </span>
          </div>
          <h3 className="text-2xl font-black text-text-main dark:text-white font-display">
            Game Zone
          </h3>
        </div>
        <button className="text-kids-orange font-bold hover:bg-kids-orange/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
          View All{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {games.map((g) => {
          const clr = colorMap[g.tagColor] ?? colorMap.primary;
          return (
            <div
              key={g.name}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={`aspect-square w-full ${clr.bg} p-4 flex items-center justify-center`}
              >
                <img
                  alt={g.name}
                  className="w-16 h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                  src={g.image}
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-bold text-text-main dark:text-white truncate text-sm">
                  {g.name}
                </h4>
                <span
                  className={`text-[10px] font-bold ${clr.text} ${clr.tagBg} px-2 py-0.5 rounded-full mt-1 inline-block`}
                >
                  {g.tag}
                </span>
              </div>
            </div>
          );
        })}

        {/* More Games placeholder */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400 dark:bg-slate-800">
              <span className="material-symbols-outlined">add</span>
            </div>
            <h4 className="font-bold text-slate-400 text-sm">More Games</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
