import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <div className="@container">
      <div className="flex flex-col justify-center items-center gap-8 px-4 py-20 lg:py-32 bg-rainbow-gradient relative overflow-hidden">
        {/* Decorative Background Elements — Material Symbols */}
        <div className="absolute top-10 left-10 text-primary opacity-30 hidden md:block animate-spin" style={{ animationDuration: "20s" }}>
          <span className="material-symbols-outlined !text-[80px] font-bold">
            star
          </span>
        </div>
        <div
          className="absolute top-32 left-24 text-accent-red opacity-20 hidden md:block animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <span className="material-symbols-outlined !text-[60px] font-bold">
            favorite
          </span>
        </div>
        <div
          className="absolute top-16 right-20 text-accent-blue opacity-40 hidden md:block"
          style={{ animation: "wiggle 4s ease-in-out infinite" }}
        >
          <span className="material-symbols-outlined !text-[100px] font-bold">
            cloud
          </span>
        </div>
        <div
          className="absolute top-8 right-40 text-primary opacity-20 hidden lg:block animate-pulse"
          style={{ animationDuration: "3s" }}
        >
          <span className="material-symbols-outlined !text-[50px] font-bold">
            kid_star
          </span>
        </div>
        <div className="absolute bottom-20 left-20 text-green-500 opacity-30 hidden md:block animate-gentle-bounce">
          <span className="material-symbols-outlined !text-[90px] font-bold">
            eco
          </span>
        </div>
        <div
          className="absolute bottom-10 left-48 text-purple-500 opacity-20 hidden lg:block animate-spin"
          style={{ animationDuration: "15s" }}
        >
          <span className="material-symbols-outlined !text-[70px] font-bold">
            auto_awesome
          </span>
        </div>
        <div
          className="absolute bottom-14 right-14 text-accent-blue opacity-30 hidden md:block animate-bounce"
          style={{ animationDuration: "6s", animationDelay: "0.5s" }}
        >
          <span className="material-symbols-outlined !text-[110px] font-bold">
            rocket_launch
          </span>
        </div>
        <div
          className="absolute bottom-40 right-32 text-primary opacity-40 hidden lg:block"
          style={{ animation: "wiggle 5s ease-in-out infinite" }}
        >
          <span className="material-symbols-outlined !text-[60px] font-bold">
            wb_sunny
          </span>
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-5 text-center max-w-2xl z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-text-main tracking-tight text-3xl font-black leading-tight sm:text-5xl lg:text-6xl dark:text-white">
            Ready to Start Your <br /> Adventure?
          </h2>
          <p className="text-text-muted text-lg font-normal leading-relaxed dark:text-stone-300 max-w-xl mx-auto">
            Join thousands of other families and leaders in the Kidspiration
            community today. It's safe, fun, and free to explore!
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center z-10">
          <button
            onClick={() => navigate("/signup")}
            className="btn-sparkle flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-14 px-10 bg-primary text-stone-900 text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="mr-2">Get Started for Free</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            onClick={() => navigate("/about")}
            className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-2xl h-14 px-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-text-main dark:text-white text-lg font-bold shadow-sm border border-stone-200 dark:border-slate-700 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="mr-2">Learn More</span>
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
