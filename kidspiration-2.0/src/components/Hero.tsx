import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import live1 from "../assets/real-images/live-5.jpg";
import live2 from "../assets/real-images/live-6.jpg";
import live3 from "../assets/real-images/live-12.jpg";
import kidspirationVideo from "../assets/KIDSPIRATION_IMPACT.mp4";
import VideoModal from "./VideoModal";
import TypewriterText from "./TypewriterText";
import FloatingShapes from "./FloatingShapes";

const heroImages = [
  {
    src: live1,
    alt: "Happy kids jumping and playing together",
    label: "Daily Challenges",
    sub: "Join 10k+ explorers today!",
  },
  {
    src: live2,
    alt: "Kids participating in the Last Child challenge",
    label: "Last Child Challenge",
    sub: "Reach every child worldwide!",
  },
  {
    src: live3,
    alt: "Kids reading and learning together",
    label: "Bible Adventures",
    sub: "Discover God's love!",
  },
];

const AUTOPLAY_INTERVAL = 5000;
const HEADING_TEXT = "Welcome To Kidspiration!";

export default function Hero() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeImage = heroImages[currentSlide];

  return (
    <div className="@container w-full bg-hero-pattern relative overflow-hidden">
      {/* Floating background SVG shapes */}
      <FloatingShapes />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 py-12 lg:px-20 lg:py-24 max-w-7xl mx-auto">
        {/* Text — slides in from left */}
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2 z-10"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="animate-wiggle inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 dark:bg-stone-800 dark:text-primary">
            <span className="material-symbols-outlined text-sm">
              celebration
            </span>
            <span>Join millions of kids worldwide!</span>
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white sm:text-5xl lg:text-6xl">
            <TypewriterText text={HEADING_TEXT} />
          </h1>
          <p className="text-lg font-normal leading-relaxed text-text-muted dark:text-stone-300 max-w-xl mx-auto lg:mx-0">
            Discover the joy of faith through inspiring Bible stories, fun
            activities, and exciting adventures designed to help kids grow in
            God's love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
            <button
              className="animate-gentle-bounce flex h-12 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-stone-900 shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:-translate-y-1"
              onClick={() => navigate("/signup")}
            >
              <span className="truncate">Join the Fun</span>
              <span className="material-symbols-outlined ml-2">
                rocket_launch
              </span>
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-white border border-stone-200 px-8 text-base font-bold text-text-main shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:bg-stone-700"
            >
              <span className="truncate">Watch Video</span>
              <span className="material-symbols-outlined ml-2">
                play_circle
              </span>
            </button>
          </div>
        </motion.div>

        {/* Hero Image Carousel — slides in from right */}
        <motion.div
          className="w-full lg:w-1/2 relative flex justify-center items-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div className="absolute top-0 right-10 w-24 h-24 bg-purple-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30"></div>

          {/* Carousel container */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-full lg:w-[120%]">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-stone-100 dark:bg-stone-900 border-[6px] border-white/10 dark:border-white/5 bg-clip-padding">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl"
                />
              </AnimatePresence>

              {/* {heroImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                  />
                </div>
              ))} */}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-2xl md:rounded-3xl"></div>

              {/* Slide label */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <p className="font-bold text-lg">
                  {heroImages[currentSlide].label}
                </p>
                <p className="text-sm opacity-90">
                  {heroImages[currentSlide].sub}
                </p>
              </div>

              {/* Left/Right arrows */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? heroImages.length - 1 : prev - 1,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-9 rounded-full bg-card-bg/20 dark:bg-black/30 backdrop-blur-sm text-white hover:bg-card-bg/40 dark:hover:bg-black/50 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroImages.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-9 rounded-full bg-card-bg/20 dark:bg-black/30 backdrop-blur-sm text-white hover:bg-card-bg/40 dark:hover:bg-black/50 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide
                      ? "w-8 h-3 bg-primary carousel-dot-active"
                      : "w-3 h-3 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
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
