import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdultsCTA() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-orange-500">
      {/* Decorative Abstract Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={containerRef}>
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-[2.5rem] p-10 sm:p-14 border border-white/20 shadow-2xl"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Ready to Start the Journey?
          </h2>
          <p className="text-xl text-white/90 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Create an account today to unlock the full potential of Kidspiration. Join thousands of parents, pastors, and mentors guiding the next generation in faith.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/signup/adult?role=parent_or_mentor")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-extrabold text-lg hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group"
            >
              Sign Up Now
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-white font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 border-2 border-white/40 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-white/80">storefront</span>
              Visit Marketplace
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
