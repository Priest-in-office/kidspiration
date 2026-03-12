import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import kidspiration1 from "../assets/kidspiration-1.png";
import kidspiration2 from "../assets/kidspiration-2.png";
import kidspiration3 from "../assets/kidspiration-3.png";
import kidspiration4 from "../assets/kidspiration-4.png";
import kidspiration5 from "../assets/kidspiration-5.png";
import kidspiration6 from "../assets/kidspiration-6.png";
import kidspiration7 from "../assets/kidspiration-7.png";
import healingStreamsImg from "../assets/HSLHS_MARCH_2026.jpg";

const GALLERY_IMAGES = [
  { src: kidspiration1, alt: "Kids playing together" },
  { src: kidspiration2, alt: "The Last Child Challenge" },
  { src: kidspiration3, alt: "Kids reading and learning" },
  { src: healingStreamsImg, alt: "Healing Streams event" },
  { src: kidspiration4, alt: "HTTN Magazine for Kids" },
  { src: kidspiration5, alt: "Kidspiration Marketplace" },
  { src: kidspiration6, alt: "Kidspiration Party" },
  { src: kidspiration7, alt: "ER100 Initiative" },
];

// Double the images for seamless loop
const SCROLL_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function GalleryStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="w-full py-16 lg:py-20 bg-white dark:bg-slate-900 overflow-hidden"
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-lg">photo_camera</span>
          <span>Gallery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main dark:text-white leading-tight">
          See What's Happening!
        </h2>
        <p className="text-text-muted dark:text-stone-400 text-lg mt-3 max-w-xl mx-auto">
          A glimpse into the lives of kids we reach around the world.
        </p>
      </motion.div>

      {/* Auto-scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

        <div className="gallery-marquee flex gap-4 md:gap-6">
          {SCROLL_IMAGES.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-36 md:w-64 md:h-48 lg:w-72 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ transform: `rotate(${i % 2 === 0 ? "1" : "-1"}deg)` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
