import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

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
  started: boolean;
  duration: number;
}

function StatItem({ target, suffix, label, started, duration }: StatItemProps) {
  const count = useCountUp(target, duration, started);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-black text-primary mb-1">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { target: 10000, suffix: "+", label: "Happy Kids", duration: 2000 },
  { target: 500, suffix: "+", label: "Groups", duration: 1800 },
  { target: 100, suffix: "%", label: "Safe Fun", duration: 1600 },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="w-full bg-primary/10 py-12 px-4 dark:bg-stone-800/50"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-20 text-center">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} started={isInView} />
        ))}
      </div>
    </div>
  );
}

// TODO: Fetch stats from API
