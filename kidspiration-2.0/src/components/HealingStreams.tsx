import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import healingStreamsImg from "../assets/HSLHS_MARCH_2026.jpg";
import { Link } from "react-router";

const EVENT_DATE = new Date("2026-03-13T00:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(EVENT_DATE - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// function FlipDigit({ value, label }: { value: number; label: string }) {
//   const [display, setDisplay] = useState(value);
//   const [flipping, setFlipping] = useState(false);

//   useEffect(() => {
//     if (value !== display) {
//       setFlipping(true);
//       const timer = setTimeout(() => {
//         setDisplay(value);
//         setFlipping(false);
//       }, 250);
//       return () => clearTimeout(timer);
//     }
//   }, [value, display]);

//   const formatted = String(display).padStart(2, "0");

//   return (
//     <div className="flip-card">
//       <div className={`flip-card-inner ${flipping ? "flip-animate" : ""}`}>
//         {formatted}
//       </div>
//       <span className="countdown-label">{label}</span>
//     </div>
//   );
// }

export default function HealingStreams() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -100]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  const tick = useCallback(() => {
    setTimeLeft(getTimeLeft());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div
      ref={sectionRef}
      className="@container w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 lg:px-20 lg:py-24 max-w-7xl mx-auto">
        {/* Image — moves slower for parallax depth */}
        <motion.div
          className="lg:w-1/2 relative flex justify-center items-center"
          style={{ y: imageY }}
        >
          <div className="absolute top-0 left-10 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30"></div>
          <div className="relative w-full aspect-4/3 max-w-md lg:max-w-full rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={healingStreamsImg}
              alt="Healing Streams Live Healing Services with Pastor Chris - March 2026"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text — moves faster for parallax depth */}
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2 z-10"
          style={{ y: textY }}
        >
          <div className="inline-flex w-fit mx-auto mt-4 lg:mx-0 items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>March 13–15, 2026</span>
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text-main dark:text-white sm:text-4xl lg:text-5xl">
            HSLHS with Pastor Chris Now Streaming on{" "}
            <span className="text-primary">
              Kidspiration!
            </span>
          </h2>

          {/* Flip Countdown Timer */}
          {/* <div className="flex items-start justify-center lg:justify-start gap-1 sm:gap-2">
            <FlipDigit value={timeLeft.days} label="Days" />
            <span className="countdown-colon">:</span>
            <FlipDigit value={timeLeft.hours} label="Hours" />
            <span className="countdown-colon">:</span>
            <FlipDigit value={timeLeft.minutes} label="Mins" />
            <span className="countdown-colon">:</span>
            <FlipDigit value={timeLeft.seconds} label="Secs" />
          </div> */}

          <p className="text-lg font-normal leading-relaxed text-text-muted dark:text-stone-300 max-w-xl mx-auto lg:mx-0">
            The Healing Streams Live Healing Services with Pastor Chris is here! Get ready to experience
            the miraculous! Join billions around the world for three days of
            faith, healing, and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
            <Link
              to="/live"
              rel="noopener noreferrer"
              className="animate-pulse-glow flex h-12 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-stone-900 shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:-translate-y-1"
            >
              <span className="truncate">Watch Now</span>
              <span className="material-symbols-outlined ml-2">
                arrow_forward
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
