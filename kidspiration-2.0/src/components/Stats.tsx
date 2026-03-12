import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: string;
  started: boolean;
  duration: number;
}

function StatItem({ target, suffix, label, icon, started, duration }: StatItemProps) {
  const count = useCountUp(target, duration, started);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="material-symbols-outlined text-3xl text-white/70 mb-1">
        {icon}
      </span>
      <span className="text-4xl sm:text-5xl font-black text-white font-display drop-shadow-md">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm font-bold uppercase tracking-widest text-white/80">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { target: 10000, suffix: "+", label: "Happy Kids", icon: "mood", duration: 2000 },
  { target: 500, suffix: "+", label: "Groups", icon: "groups", duration: 1800 },
  { target: 100, suffix: "%", label: "Safe Fun", icon: "verified_user", duration: 1600 },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Wave top */}
      <div className="leading-[0]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-auto block">
          <path
            d="M0 60 C360 0 720 60 1080 20 C1260 0 1380 10 1440 20 L1440 0 L0 0 Z"
            className="fill-white dark:fill-slate-800/50"
          />
        </svg>
      </div>

      {/* Stats band */}
      <motion.div
        className="w-full bg-gradient-to-br from-accent-blue via-blue-500 to-indigo-600 py-12 md:py-16 px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 text-center">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} started={isInView} />
          ))}
        </div>
      </motion.div>

      {/* Wave bottom */}
      <div className="leading-[0]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-auto block">
          <path
            d="M0 0 C360 60 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 60 L0 60 Z"
            className="fill-white dark:fill-slate-800/50"
          />
        </svg>
      </div>
    </div>
  );
}
