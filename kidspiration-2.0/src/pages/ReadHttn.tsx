import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveCanvas from "../components/InteractiveCanvas";

// Pages that allow coloring (0-indexed: Page 2=1, Page 7=6, Page 14=13)
const COLORING_PAGES = [1, 6, 13];

// MP4 files for all 16 pages
import coverpg from "../ANIMATED HTTN VIDEOS/coverpg.mp4";
import pg2 from "../ANIMATED HTTN VIDEOS/pg2.mp4";
import pg3 from "../ANIMATED HTTN VIDEOS/pg3.mp4";
import pg4 from "../ANIMATED HTTN VIDEOS/pg4.mp4";
import pg5 from "../ANIMATED HTTN VIDEOS/pg5.mp4";
import pg6 from "../ANIMATED HTTN VIDEOS/pg6.mp4";
import pg7 from "../ANIMATED HTTN VIDEOS/pg7.mp4";
import pg8 from "../ANIMATED HTTN VIDEOS/pg8.mp4";
import pg9 from "../ANIMATED HTTN VIDEOS/pg9.mp4";
import pg10 from "../ANIMATED HTTN VIDEOS/pg10.mp4";
import pg11 from "../ANIMATED HTTN VIDEOS/pg11.mp4";
import pg12 from "../ANIMATED HTTN VIDEOS/pg12.mp4";
import pg13 from "../ANIMATED HTTN VIDEOS/pg13.mp4";
import pg14 from "../ANIMATED HTTN VIDEOS/pg14.mp4";
import pg15 from "../ANIMATED HTTN VIDEOS/pg15.mp4";
import pg16 from "../ANIMATED HTTN VIDEOS/pg16.mp4";

const MAGAZINE_PAGES = [
  coverpg,
  pg2,
  pg3,
  pg4,
  pg5,
  pg6,
  pg7,
  pg8,
  pg9,
  pg10,
  pg11,
  pg12,
  pg13,
  pg14,
  pg15,
  pg16,
];

export default function ReadHttn() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Default to playing
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<
    "forward" | "backward" | "none"
  >("none");

  // We keep two sources, one for each video element layer.
  // Initially, Layer 0 plays Page 1 (index 0). Layer 1 preloads Page 2 (index 1).
  const [videoSrcs, setVideoSrcs] = useState<[string, string]>([
    MAGAZINE_PAGES[0],
    MAGAZINE_PAGES[1] || "",
  ]);

  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  // When changing pages
  const goToPage = (newIndex: number) => {
    if (
      newIndex < 0 ||
      newIndex >= MAGAZINE_PAGES.length ||
      newIndex === currentPage
    )
      return;

    setIsPlaying(true);
    setIsVideoEnded(false);

    const isNext = newIndex === currentPage + 1;
    // If not strict next (i.e. jumping pages or Prev), determine direction relative to current
    const isForward = newIndex > currentPage;
    setSlideDirection(isForward ? "forward" : "backward");

    const newActiveLayer = activeLayer === 0 ? 1 : 0;
    const layerToPreload = activeLayer; // The one currently active will become hidden and get preloaded

    if (isNext) {
      // Forward: The target layer SHOULD already hold the correct video src because we preloaded it.
      // We just switch active layers.
      setActiveLayer(newActiveLayer);
      setCurrentPage(newIndex);

      // Preload the *next next* video into the newly hidden layer after the fade finishes
      setTimeout(() => {
        setVideoSrcs((prev) => {
          const newSrcs = [...prev] as [string, string];
          newSrcs[layerToPreload] = MAGAZINE_PAGES[newIndex + 1] || "";
          return newSrcs;
        });
      }, 600);
    } else {
      // Backward or jump: The target layer probably doesn't have the correct video.
      // Force load it immediately.
      setVideoSrcs((prev) => {
        const newSrcs = [...prev] as [string, string];
        newSrcs[newActiveLayer] = MAGAZINE_PAGES[newIndex];
        return newSrcs;
      });
      setActiveLayer(newActiveLayer);
      setCurrentPage(newIndex);

      // Preload the expected next video based on direction.
      // Usually if they went backward, they might keep going backwards.
      const isPrev = newIndex === currentPage - 1;
      const preloadIndex = isPrev ? newIndex - 1 : newIndex + 1;

      setTimeout(() => {
        setVideoSrcs((prev) => {
          const newSrcs = [...prev] as [string, string];
          newSrcs[layerToPreload] = MAGAZINE_PAGES[preloadIndex] || "";
          return newSrcs;
        });
      }, 600);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVideoEnded = () => {
    // Stop playing at the end of the video instead of auto-advancing.
    setIsPlaying(false);
    setIsVideoEnded(true);
  };

  // Ensure active video follows isPlaying state
  useEffect(() => {
    const activeVideo =
      activeLayer === 0 ? video0Ref.current : video1Ref.current;
    if (activeVideo) {
      if (isPlaying) {
        // We set volume to 1 in case it was lowered, and ensure it's not muted.
        // Note: Browsers may still block unmuted autoplay if the user hasn't interacted with the page yet.
        activeVideo.play().catch((e) => {
          console.log("Autoplay blocked (likely waiting for interaction):", e);
          // If autoplay is blocked, we should probably pause our UI state
          setIsPlaying(false);
        });
      } else {
        activeVideo.pause();
      }
    }

    const dormantVideo =
      activeLayer === 0 ? video1Ref.current : video0Ref.current;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (dormantVideo) {
      // Delay stopping the dormant video to allow the crossfade transition to complete smoothly
      timeoutId = setTimeout(() => {
        dormantVideo.pause();
        // Reset dormant video to start so it's ready for next time
        dormantVideo.currentTime = 0;
      }, 500); // 500ms matches the duration-500 Tailwind class
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeLayer, isPlaying]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans overflow-x-clip">
      <style>{`
        @keyframes sweepForward {
          0% { transform: translateX(100%); box-shadow: -15px 0 25px rgba(0,0,0,0.15); }
          100% { transform: translateX(0); box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        @keyframes sweepBackward {
          0% { transform: translateX(-100%); box-shadow: 15px 0 25px rgba(0,0,0,0.15); }
          100% { transform: translateX(0); box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        .animate-sweep-forward {
          animation: sweepForward 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-sweep-backward {
          animation: sweepBackward 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black font-display text-text-main dark:text-white mb-2">
            Read HTTN Magazine
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Page {currentPage + 1} of {MAGAZINE_PAGES.length}
          </p>
        </header>

        {/* Double-Buffered Video Container */}
        {/* We use a vertical aspect ratio matching standard magazine/A4 sizes so the video is never cropped */}
        <InteractiveCanvas
          currentPage={currentPage}
          coloringPages={COLORING_PAGES}
        >
          {/* Layer 0 */}
          <video
            ref={video0Ref}
            src={videoSrcs[0]}
            className={`absolute inset-0 w-full h-full object-cover origin-center ${
              activeLayer === 0
                ? "z-10 opacity-100 " +
                  (slideDirection === "forward"
                    ? "animate-sweep-forward"
                    : slideDirection === "backward"
                      ? "animate-sweep-backward"
                      : "")
                : "z-0 opacity-100 mix-blend-normal pointer-events-none"
            }`}
            style={
              {
                // We only want the shadow to appear on the active sliding card, but we use the animation class for that.
              }
            }
            onEnded={handleVideoEnded}
            playsInline
          />

          {/* Layer 1 */}
          <video
            ref={video1Ref}
            src={videoSrcs[1]}
            className={`absolute inset-0 w-full h-full object-cover origin-center ${
              activeLayer === 1
                ? "z-10 opacity-100 " +
                  (slideDirection === "forward"
                    ? "animate-sweep-forward"
                    : slideDirection === "backward"
                      ? "animate-sweep-backward"
                      : "")
                : "z-0 opacity-100 mix-blend-normal pointer-events-none"
            }`}
            onEnded={handleVideoEnded}
            playsInline
          />
        </InteractiveCanvas>

        {/* Magazine Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 text-text-main dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Prev
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center size-12 bg-primary hover:bg-primary-dark text-slate-900 rounded-full font-bold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span className="material-symbols-outlined !text-[24px]">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === MAGAZINE_PAGES.length - 1}
            className={`flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 text-text-main dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary 
              ${isVideoEnded && currentPage !== MAGAZINE_PAGES.length - 1 ? "ring-4 ring-primary/50 animate-pulse bg-primary/20" : ""}`}
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
