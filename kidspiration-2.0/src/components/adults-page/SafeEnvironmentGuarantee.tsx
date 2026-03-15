import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SafeEnvironmentGuarantee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-24 bg-slate-900 overflow-hidden transform-gpu">
      {/* Decorative SVG background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M25 0l25 14.4v28.8L25 57.6 0 43.2V14.4z" fill="none" stroke="#f4c025" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center" ref={containerRef}>
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={isInView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
           className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 relative"
        >
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
          <span className="material-symbols-outlined text-5xl text-primary">gpp_good</span>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight max-w-2xl mx-auto">
            A Safe Haven for the <br/>
            <span className="text-primary">Next Generation</span>
          </h2>
          
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            We prioritize your child's spiritual growth and safety above all. The Kidspiration platform is strictly moderated, fundamentally ad-free, and designed with comprehensive data privacy to ensure a worry-free experience for parents.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-sm">verified</span>
              <span className="text-slate-300 text-sm font-bold tracking-wide">100% Ad-Free</span>
            </div>
            <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-sm">enhanced_encryption</span>
              <span className="text-slate-300 text-sm font-bold tracking-wide">Data Privacy Guarantee</span>
            </div>
            <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-400 text-sm">local_police</span>
              <span className="text-slate-300 text-sm font-bold tracking-wide">Strict Moderation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
