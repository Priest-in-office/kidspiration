import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const RESOURCES = [
  {
    title: "Monthly Companion Guide",
    description: "Discussion points and activities tailored to the current HTTN Magazine edition.",
    icon: "menu_book",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    hoverBorder: "hover:border-orange-500"
  },
  {
    title: "Lesson Plans for Pastors",
    description: "Structured guides for Sunday school class integration and group activities.",
    icon: "assignment",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500"
  },
  {
    title: "Activity Printables",
    description: "Offline puzzles, coloring pages, and word games perfectly safe for kids.",
    icon: "print",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    hoverBorder: "hover:border-green-500"
  },
  {
    title: "Mentorship Training",
    description: "Articles and quick videos on communicating faith, healing, and hope effectively.",
    icon: "play_circle",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500"
  }
];

export default function ResourceLibraryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-20 lg:py-32 bg-white dark:bg-[#0f172a] overflow-hidden doodle-pattern">
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/90 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-bold text-sm uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-xl">library_books</span>
              Resource Library
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
              Mentorship Tools at <br className="hidden sm:block" /> Your Fingertips
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Equip yourself with everything you need to guide them. Download companion materials, print off activities, and access training perfectly synced with the Kids Zone content.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-white dark:bg-[#1a2235] p-6 lg:p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${item.hoverBorder}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="mt-auto flex items-center font-bold text-sm text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors gap-1">
                Explore 
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
