import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import patternImg from "../../assets/real-images/live-4.jpg"; // Placeholder image

export default function ProgressTrackerPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { value: "48", label: "Badges Earned", suffix: "+", color: "text-rose-500" },
    { value: "12", label: "Magazines Read", suffix: "", color: "text-blue-500" },
    { value: "300", label: "Mins of Game Learning", suffix: "+", color: "text-orange-500" },
  ];

  return (
    <section className="relative w-full py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Visual/Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1 relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-orange-400/20 mix-blend-overlay z-10" />
            <img 
              src={patternImg} 
              alt="Kids engaging with HTTN magazine" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Glass Panel */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                <span className="material-symbols-outlined text-3xl text-primary">tips_and_updates</span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Actionable Insight</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Leo just finished the March HTTN Magazine! 
                <br/><span className="text-primary-dark dark:text-primary font-bold">Try asking him:</span> "What was your favorite miracle story?"
              </p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-xl">auto_graph</span>
              Progress & Activity
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Celebrate Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 relative">
                Milestone
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Stay connected to your child's journey. Our visual reports show you exactly what they are learning, playing, and reading in the Kidspiration universe.
            </p>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-[#1a2235] p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center hover:-translate-y-1 transition-transform"
                >
                  <div className={`text-4xl font-display font-black tracking-tighter ${stat.color} mb-1 flex items-baseline`}>
                    {stat.value}
                    <span className="text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-4 px-6 py-3 self-start rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:border-rose-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex items-center gap-2">
              View Sample Report
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
