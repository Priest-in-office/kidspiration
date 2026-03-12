import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import kidspiration1 from "../assets/kidspiration-1.png";
import kidspirationVideo from "../assets/KIDSPIRATION_IMPACT.mp4";
import VideoModal from "./VideoModal";
const HEADING_TEXT = "Welcome To Kidspiration!";
const TYPING_SPEED = 90;

export default function Hero() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Typing animation
  useEffect(() => {
    if (typedCount < HEADING_TEXT.length) {
      const timer = setTimeout(() => setTypedCount((c) => c + 1), TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      setTypingDone(true);
    }
  }, [typedCount]);

  return (
    <div className="relative w-full min-h-[85vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${kidspiration1})` }}
      />

      {/* Gradient overlay for text readability — darker from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[8%] w-16 h-16 rounded-full bg-primary/30 blur-sm"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] right-[12%] w-10 h-10 rounded-full bg-accent-blue/40 blur-sm"
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-12 h-12 rounded-lg bg-accent-red/30 blur-sm rotate-45"
          animate={{ y: [0, -15, 0], rotate: [45, 60, 45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[20%] w-8 h-8 rounded-full bg-primary/40 blur-sm"
          animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-6 px-4 py-20 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-5 py-2 text-xs font-bold uppercase tracking-wider text-white border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="material-symbols-outlined text-sm text-primary">
            celebration
          </span>
          <span>Join millions of kids worldwide!</span>
        </motion.div>

        {/* Heading with typing animation */}
        <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl drop-shadow-lg">
          {/* "Welcome To " part (first 11 chars) */}
          {HEADING_TEXT.slice(0, Math.min(typedCount, 11))}
          {/* "Kidspiration!" part (chars 11+) in primary with wavy underline */}
          {typedCount > 11 && (
            <span className="text-primary underline decoration-wavy decoration-4 underline-offset-8">
              {HEADING_TEXT.slice(11, typedCount)}
            </span>
          )}
          {/* Blinking cursor */}
          {!typingDone && (
            <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" />
          )}
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl font-normal leading-relaxed text-white/85 max-w-xl drop-shadow-md">
          Discover the joy of faith through inspiring Bible stories, fun
          activities, and exciting adventures designed to help kids grow in
          God's love.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <button
            className="animate-gentle-bounce flex h-14 cursor-pointer items-center justify-center rounded-2xl bg-primary px-10 text-lg font-bold text-stone-900 shadow-lg shadow-primary/40 transition-all hover:bg-primary-hover hover:-translate-y-1 hover:shadow-xl"
            onClick={() => navigate("/signup")}
          >
            <span className="truncate">Join the Fun</span>
            <span className="material-symbols-outlined ml-2">
              rocket_launch
            </span>
          </button>
          <button
            onClick={() => setShowVideo(true)}
            className="flex h-14 cursor-pointer items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 px-10 text-lg font-bold text-white shadow-sm transition-all hover:bg-white/25 hover:-translate-y-1"
          >
            <span className="truncate">Watch Our Story</span>
            <span className="material-symbols-outlined ml-2">
              play_circle
            </span>
          </button>
        </div>
      </motion.div>

      {/* Wave divider at bottom */}
      <div className="absolute -bottom-px left-0 right-0 z-20 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C360 100 720 0 1080 60 C1260 90 1380 80 1440 70 L1440 100 L0 100 Z"
            className="fill-white dark:fill-slate-900"
          />
        </svg>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl={kidspirationVideo}
        title="Welcome to Kidspiration"
      />
    </div>
  );
}
