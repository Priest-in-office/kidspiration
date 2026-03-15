import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdultsHero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-background-light dark:bg-slate-950 overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-36 z-0">
      {/* Background patterns from index.css */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10" />

      {/* Decorative blurred accent blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Subtle top label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1a170d] border border-slate-200 dark:border-[#3a3525] shadow-sm mb-8">
            <span className="material-symbols-outlined text-primary text-base">
              family_star
            </span>
            <span className="text-sm font-bold tracking-wide text-slate-700 dark:text-slate-300 uppercase">
              For Parents, Pastors & Mentors
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-main dark:text-white leading-[1.1] tracking-tight mb-6">
            Empower the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-500 relative inline-block pb-1">
              Next Generation
            </span>{" "}
            of Faith
          </h1>

          {/* Value Proposition Subtext */}
          <p className="text-lg sm:text-xl text-text-muted dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the mission to guide children on their spiritual journey. Access mentorship resources, track their progress, and build a strong foundation of faith together.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/signup/adult?role=parent_or_mentor")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-slate-900 font-extrabold text-lg hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
            >
              Join as a Parent
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => navigate("/signup/adult?role=pastor_or_leader")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-slate-200/50 dark:shadow-none border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center gap-2"
            >
              Register a Group
              <span className="material-symbols-outlined text-slate-400">
                group
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
