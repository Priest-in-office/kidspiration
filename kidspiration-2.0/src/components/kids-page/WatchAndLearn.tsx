const videos = [
  {
    title: "Cool Science Tricks!",
    channel: "Science Club",
    time: "2 days ago",
    duration: "12:04",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxbOn0_4n65pSMZirMKWXP2yiZvDrNyUr22OSOtc6lj_8Y_LIFdgdW2SsDqJZA_Z_No-HdHVwxHab7Q_bkRq99CkvUrTweIdrjtiTOCBs7v3mgqnWPH6KwWnAjHBIqkVWFpghud1YPb-Buokx-XxCWGo9_Q2FjcXbawHMTV7oszN1vrt_4MTdhlCNIDSbCuHWQ0ms9TUDVv_H5oSkqp6y5evdIB02ZL8jRe6FsraG34Nm-TTekdF0Xjbg14UzD5SxpEc2HpLIQoCS0",
  },
  {
    title: "Draw a Funny Toy",
    channel: "Art Studio",
    time: "1 week ago",
    duration: "08:30",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6dPiLcaAklNp6ghntzaCm5WneV3PPGMSWOsH9SO5BZMFhsi7hkXhH5q5AaqMwtqAyFqr1jNEtQrDA1O5YZRf3o3-xDHWlpvBShWGgFMJzvMIgYDm3ENDM5nHoBv3bXGEsEOr6BYYPMO942xM3uqYUfEwAqASx7yuvBAdAVOJE_ayk8JMOMH6P3o_ue9Gq8se8oFyNrW7t890LU8_DhxyB33zbe4LHhx0CajR8PgHUQJM_41AWAhdaomVPlKH2YL_nE1g-h2A6_VvU",
  },
];

export default function WatchAndLearn() {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-kids-blue rounded-full blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-kids-blue/20 p-2.5 rounded-xl text-kids-blue">
            <span className="material-symbols-outlined text-3xl">
              play_circle
            </span>
          </div>
          <h3 className="text-2xl font-black text-text-main dark:text-white font-display">
            Watch &amp; Learn
          </h3>
        </div>
        <button className="text-kids-blue font-bold hover:bg-kids-blue/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
          View All{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {videos.map((v) => (
          <div key={v.title} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                  <span className="material-symbols-outlined text-3xl ml-1">
                    play_arrow
                  </span>
                </div>
              </div>
              <img
                alt={v.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                src={v.image}
              />
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md z-20">
                {v.duration}
              </span>
            </div>
            <h4 className="font-bold text-lg leading-tight text-text-main dark:text-white group-hover:text-kids-blue transition-colors">
              {v.title}
            </h4>
            <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
              {v.channel} • {v.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
