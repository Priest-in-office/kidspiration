import { Link } from "react-router-dom";

const covers = [
  {
    title: "May 2023: Space Adventure",
    isNew: true,
    rotation: "rotate-1",
    opacity: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVozeMtYHYdQdhQclxjJ_xzUdCinsmWwTu_ckukXc2c10CNOJKlYfatKtqcLly33zykGWdyEWQBjVb3cbWEXKEkRwAhqLqC1XEtdLUK0cx_IeagCfxrHLtM6JFwc9BaLn_UMl7IfDJU0l4v1EeFRkLzQHfBeZ3KAz87Te7DqBda4CFYurY3Kwb2vxYED6_7Y40R91xpfM-TaWuKfFP8qdXbq0p2yUoKiXZ3N01G5aIZdwQLETNHR_DqDwL472ICf-j7MbLVV1kHTPP",
  },
  {
    title: "April 2023: Under the Sea",
    isNew: false,
    rotation: "-rotate-1",
    opacity: "opacity-80 hover:opacity-100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4_t3imcx1_KsWyJRpXQexTBpwUa5i7SVs6Yfh_F2kWROTJHWoX36qMAdoiCiKH1S4o3dbglQcEQFRsoosqE3uC_bFj4h-i2VMbeUcr6PbTN34v-zTOJyqUkB6JNZtP_oNSOGGO0p1lk90I14BAOn4Gx9Q4mRSmau5aF9HB5J0nE_uUOh4UPyXFNGQuj-nsnuTpgDanvyIwk74zYsgdVxyGeI53MRZceJv18WXzFMxoANjO9zHQIVDeqwCSuWOevprswi6BWlGNhc-",
  },
  {
    title: "March 2023: Jungle Safari",
    isNew: false,
    rotation: "rotate-2",
    opacity: "opacity-80 hover:opacity-100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiCTtSqSma205XntrBi_xr4RqVopkYILlS1Q232DOdApFqeYpuH93fDrnOXV2H-IXRlf4BSqasPHHQZYS6SaTVikgLtzx0ORIfBxQWKN2_6ekPb1M2x0Q9Ni30QW9rnGkcLWfDlTU67JI6zJTu-hSjJ2nq08IVC4NsjEt45bmf73ribnIFPnZ0olbJBtS2TL4Od8uCTWfwMQdGNqwZ_R-6Kw0MeSFvT_UlXqAx8dNlGGbtk38T2kEdjPj5PBqAaE88cd4xkkmAbzdF",
  },
];

export default function MagazineSection() {
  return (
    <section className="bg-gradient-to-br from-kids-blue/10 to-kids-pink/10 rounded-3xl p-8 border border-kids-blue/20 relative overflow-hidden dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-kids-blue to-kids-pink opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Text & CTAs */}
        <div className="lg:w-1/3 flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-kids-blue p-2.5 rounded-xl text-white shadow-lg">
              <span className="material-symbols-outlined text-3xl">
                auto_stories
              </span>
            </div>
            <h3 className="text-3xl font-black text-text-main dark:text-white font-display">
              Kidspiration
              <br />
              <span className="text-kids-blue">Magazine</span>
            </h3>
          </div>
          <p className="text-lg text-text-muted dark:text-slate-300 font-medium font-sans">
            Dive into the latest issue! Full of comics, puzzles, and inspiring
            stories from explorers like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              to="/read-httn4kids"
              className="flex-1 bg-kids-blue text-white font-bold py-3 px-6 rounded-xl hover:bg-kids-blue/90 transition-all shadow-lg shadow-kids-blue/30 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">menu_book</span>
              Read Digital
            </Link>
            <Link
              to="/read-httn4kids"
              className="flex-1 bg-white border-2 border-kids-pink text-kids-pink font-bold py-3 px-6 rounded-xl hover:bg-kids-pink/5 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 dark:bg-transparent dark:hover:bg-kids-pink/10"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Order Copy
            </Link>
          </div>
        </div>

        {/* Covers carousel */}
        <div className="lg:w-2/3 w-full relative z-10">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
            {covers.map((c) => (
              <div
                key={c.title}
                className={`snap-center shrink-0 w-64 group cursor-pointer transition-opacity ${c.opacity}`}
              >
                <div
                  className={`bg-white p-2 rounded-lg shadow-md ${c.rotation} group-hover:rotate-0 transition-transform duration-300 dark:bg-slate-800`}
                >
                  <div className="aspect-[3/4] rounded-md overflow-hidden bg-slate-200 relative">
                    <img
                      alt={c.title}
                      className="w-full h-full object-cover"
                      src={c.image}
                    />
                    {c.isNew && (
                      <div className="absolute top-2 right-2 bg-primary text-xs font-black px-2 py-1 rounded text-slate-900 shadow-sm">
                        NEW
                      </div>
                    )}
                  </div>
                </div>
                <h5 className="text-center font-bold mt-4 text-text-main dark:text-white">
                  {c.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
