import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveCanvas from "../components/InteractiveCanvas";
import { ArrowPathIcon, ExclamationTriangleIcon, PlayIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// ========================
// FILE IMPORTS
// ========================

// January
import janCover from "../ANIMATED HTTN VIDEOS/January/cover pg.mp4";
import janPg2 from "../ANIMATED HTTN VIDEOS/January/pg 2.mp4";
import janPg3 from "../ANIMATED HTTN VIDEOS/January/pg 3.mp4";
import janPg4 from "../ANIMATED HTTN VIDEOS/January/pg 4.mp4";
import janPg5 from "../ANIMATED HTTN VIDEOS/January/pg 5.mp4";
import janPg6 from "../ANIMATED HTTN VIDEOS/January/pg 6.mp4";
import janPg7 from "../ANIMATED HTTN VIDEOS/January/pg 7.mp4";
import janPg8 from "../ANIMATED HTTN VIDEOS/January/pg 8.mp4";
import janPg9 from "../ANIMATED HTTN VIDEOS/January/pg 9.mp4";
import janPg10 from "../ANIMATED HTTN VIDEOS/January/pg 10.mp4";
import janPg11 from "../ANIMATED HTTN VIDEOS/January/pg 11.mp4";
import janPg12 from "../ANIMATED HTTN VIDEOS/January/pg 12.mp4";
import janPg13 from "../ANIMATED HTTN VIDEOS/January/pg 13.mp4";
import janPg14 from "../ANIMATED HTTN VIDEOS/January/pg 14.mp4";
import janPg15 from "../ANIMATED HTTN VIDEOS/January/pg 15.mp4";
import janPg16 from "../ANIMATED HTTN VIDEOS/January/pg 16.mp4";

// February
import febCover from "../ANIMATED HTTN VIDEOS/February/coverpg.mp4";
import febPg2 from "../ANIMATED HTTN VIDEOS/February/pg2.mp4";
import febPg3 from "../ANIMATED HTTN VIDEOS/February/pg3.mp4";
import febPg4 from "../ANIMATED HTTN VIDEOS/February/pg4.mp4";
import febPg5 from "../ANIMATED HTTN VIDEOS/February/pg5.mp4";
import febPg6 from "../ANIMATED HTTN VIDEOS/February/pg6.mp4";
import febPg7 from "../ANIMATED HTTN VIDEOS/February/pg7.mp4";
import febPg8 from "../ANIMATED HTTN VIDEOS/February/pg8.mp4";
import febPg9 from "../ANIMATED HTTN VIDEOS/February/pg9.mp4";
import febPg10 from "../ANIMATED HTTN VIDEOS/February/pg10.mp4";
import febPg11 from "../ANIMATED HTTN VIDEOS/February/pg11.mp4";
import febPg12 from "../ANIMATED HTTN VIDEOS/February/pg12.mp4";
import febPg13 from "../ANIMATED HTTN VIDEOS/February/pg13.mp4";
import febPg14 from "../ANIMATED HTTN VIDEOS/February/pg14.mp4";
import febPg15 from "../ANIMATED HTTN VIDEOS/February/pg15.mp4";
import febPg16 from "../ANIMATED HTTN VIDEOS/February/pg16.mp4";

// March
import marCover from "../ANIMATED HTTN VIDEOS/March/Cover Page.mp4";
import marPg2 from "../ANIMATED HTTN VIDEOS/March/Page 2.mp4";
import marPg3 from "../ANIMATED HTTN VIDEOS/March/Page 3.mp4";
import marPg4 from "../ANIMATED HTTN VIDEOS/March/Page 4.mp4";
import marPg5 from "../ANIMATED HTTN VIDEOS/March/Page 5.mp4";
import marPg6 from "../ANIMATED HTTN VIDEOS/March/Page 6.mp4";
import marPg7 from "../ANIMATED HTTN VIDEOS/March/Page 7.mp4";
import marPg8 from "../ANIMATED HTTN VIDEOS/March/Page 8.mp4";
import marPg9 from "../ANIMATED HTTN VIDEOS/March/Page 9.mp4";
import marPg10 from "../ANIMATED HTTN VIDEOS/March/Page 10.mp4";
import marPg11 from "../ANIMATED HTTN VIDEOS/March/Page 11.mp4";
import marPg12 from "../ANIMATED HTTN VIDEOS/March/Page 12.mp4";
import marPg13 from "../ANIMATED HTTN VIDEOS/March/Page 13.mp4";
import marPg14 from "../ANIMATED HTTN VIDEOS/March/Page 14.mp4";
import marPg15 from "../ANIMATED HTTN VIDEOS/March/Page 15.mp4";
import marPg16 from "../ANIMATED HTTN VIDEOS/March/Page 16.mp4";

// ========================
// DATA STRUCTURES
// ========================

// Pages that allow coloring (0-indexed: Page 2=1, Page 7=6, Page 14=13)
const COLORING_PAGES = [1, 6, 13];

type MagazinePage = {
  pageNumber: number;
  video: string;
};

type MagazineIssue = {
  id: string;
  month: string;
  year: number;
  title: string;
  cover: string;
  description: string;
  pages: MagazinePage[];
};

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: "2026-01",
    month: "January",
    year: 2026,
    title: "January Edition",
    cover: janCover,
    description: "You Have the Victory",
    pages: [
      { pageNumber: 1, video: janCover },
      { pageNumber: 2, video: janPg2 },
      { pageNumber: 3, video: janPg3 },
      { pageNumber: 4, video: janPg4 },
      { pageNumber: 5, video: janPg5 },
      { pageNumber: 6, video: janPg6 },
      { pageNumber: 7, video: janPg7 },
      { pageNumber: 8, video: janPg8 },
      { pageNumber: 9, video: janPg9 },
      { pageNumber: 10, video: janPg10 },
      { pageNumber: 11, video: janPg11 },
      { pageNumber: 12, video: janPg12 },
      { pageNumber: 13, video: janPg13 },
      { pageNumber: 14, video: janPg14 },
      { pageNumber: 15, video: janPg15 },
      { pageNumber: 16, video: janPg16 },
    ],
  },
  {
    id: "2026-02",
    month: "February",
    year: 2026,
    title: "February Edition",
    cover: febCover,
    description: "Gear Up for Miracles",
    pages: [
      { pageNumber: 1, video: febCover },
      { pageNumber: 2, video: febPg2 },
      { pageNumber: 3, video: febPg3 },
      { pageNumber: 4, video: febPg4 },
      { pageNumber: 5, video: febPg5 },
      { pageNumber: 6, video: febPg6 },
      { pageNumber: 7, video: febPg7 },
      { pageNumber: 8, video: febPg8 },
      { pageNumber: 9, video: febPg9 },
      { pageNumber: 10, video: febPg10 },
      { pageNumber: 11, video: febPg11 },
      { pageNumber: 12, video: febPg12 },
      { pageNumber: 13, video: febPg13 },
      { pageNumber: 14, video: febPg14 },
      { pageNumber: 15, video: febPg15 },
      { pageNumber: 16, video: febPg16 },
    ],
  },
  {
    id: "2026-03",
    month: "March",
    year: 2026,
    title: "March Edition",
    cover: marCover,
    description: "A Wonder Fest of Miracles & Blessings",
    pages: [
      { pageNumber: 1, video: marCover },
      { pageNumber: 2, video: marPg2 },
      { pageNumber: 3, video: marPg3 },
      { pageNumber: 4, video: marPg4 },
      { pageNumber: 5, video: marPg5 },
      { pageNumber: 6, video: marPg6 },
      { pageNumber: 7, video: marPg7 },
      { pageNumber: 8, video: marPg8 },
      { pageNumber: 9, video: marPg9 },
      { pageNumber: 10, video: marPg10 },
      { pageNumber: 11, video: marPg11 },
      { pageNumber: 12, video: marPg12 },
      { pageNumber: 13, video: marPg13 },
      { pageNumber: 14, video: marPg14 },
      { pageNumber: 15, video: marPg15 },
      { pageNumber: 16, video: marPg16 },
    ],
  },
];

// ========================
// MAGAZINE READER COMPONENT
// ========================
function MagazineReader({ issue, onBack }: { issue: MagazineIssue; onBack: () => void }) {
  const magazinePages = issue.pages;
  
  // Load saved progress via localStorage using Issue ID
  const savedProgressStr = localStorage.getItem(`httn-progress-${issue.id}`);
  let initialPage = 0;
  if (savedProgressStr) {
    try {
      const parsed = JSON.parse(savedProgressStr);
      // Support old format (just string number) or new format { page: number, timestamp: number }
      initialPage = typeof parsed === 'number' ? parsed : parsed.page || 0;
    } catch {
      initialPage = parseInt(savedProgressStr, 10) || 0;
    }
  }
  
  const safeInitialPage = !isNaN(initialPage) && initialPage >= 0 && initialPage < magazinePages.length ? initialPage : 0;

  const [currentPage, setCurrentPage] = useState<number>(safeInitialPage);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward" | "none">("none");

  // Only load two pages in the DOM at a time: current page and preloading the next page
  const [videoSrcs, setVideoSrcs] = useState<[string, string]>([
    magazinePages[safeInitialPage].video,
    magazinePages[safeInitialPage + 1]?.video || "",
  ]);

  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  // Save progress + timestamp to memory whenever the page changes
  useEffect(() => {
    const progressData = {
      page: currentPage,
      timestamp: Date.now()
    };
    localStorage.setItem(`httn-progress-${issue.id}`, JSON.stringify(progressData));
    
    // Also store a global pointer to the most recently read issue ID
    localStorage.setItem(`httn-last-read-issue`, issue.id);
  }, [currentPage, issue.id]);

  // Handle crossfade page jumps
  const goToPage = (newIndex: number) => {
    if (
      newIndex < 0 ||
      newIndex >= magazinePages.length ||
      newIndex === currentPage
    )
      return;

    setIsPlaying(true);
    setIsVideoEnded(false);

    const isNext = newIndex === currentPage + 1;
    const isForward = newIndex > currentPage;
    setSlideDirection(isForward ? "forward" : "backward");

    const newActiveLayer = activeLayer === 0 ? 1 : 0;
    const layerToPreload = activeLayer; 

    if (isNext) {
      setActiveLayer(newActiveLayer);
      setCurrentPage(newIndex);
      setTimeout(() => {
        setVideoSrcs((prev) => {
          const newSrcs = [...prev] as [string, string];
          newSrcs[layerToPreload] = magazinePages[newIndex + 1]?.video || "";
          return newSrcs;
        });
      }, 600);
    } else {
      setVideoSrcs((prev) => {
        const newSrcs = [...prev] as [string, string];
        newSrcs[newActiveLayer] = magazinePages[newIndex].video;
        return newSrcs;
      });
      setActiveLayer(newActiveLayer);
      setCurrentPage(newIndex);

      const isPrev = newIndex === currentPage - 1;
      const preloadIndex = isPrev ? newIndex - 1 : newIndex + 1;

      setTimeout(() => {
        setVideoSrcs((prev) => {
          const newSrcs = [...prev] as [string, string];
          newSrcs[layerToPreload] = magazinePages[preloadIndex]?.video || "";
          return newSrcs;
        });
      }, 600);
    }
  };

  const togglePlayPause = () => setIsPlaying((prev) => !prev);
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVideoEnded(true);
  };

  useEffect(() => {
    const activeVideo = activeLayer === 0 ? video0Ref.current : video1Ref.current;
    if (activeVideo) {
      if (isPlaying) {
        activeVideo.play().catch((e) => {
          console.log("Autoplay blocked (likely waiting for interaction):", e);
          setIsPlaying(false);
        });
      } else {
        activeVideo.pause();
      }
    }

    const dormantVideo = activeLayer === 0 ? video1Ref.current : video0Ref.current;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (dormantVideo) {
      timeoutId = setTimeout(() => {
        dormantVideo.pause();
        dormantVideo.currentTime = 0;
      }, 500); 
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeLayer, isPlaying]);

  return (
    <motion.div 
      key="reader"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -30 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
    >
      <header className="mb-6 w-full flex flex-col items-center justify-center relative">
        <button 
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-bold transition-all border border-transparent shadow-sm hover:shadow"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="hidden sm:inline">Library</span>
        </button>
        <h1 className="text-2xl md:text-4xl font-black font-display text-text-main dark:text-white">
          {issue.month} Edition - {issue.description}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium">
          Page {currentPage + 1} of {magazinePages.length}
        </p>
      </header>

      {/* Double-Buffered Video Container */}
      <InteractiveCanvas currentPage={currentPage} coloringPages={COLORING_PAGES}>
        {/* Layer 0: current page or precached adjacent page. Preload="auto" to ensure it completely loads the asset if available. */}
        <video
          ref={video0Ref}
          src={videoSrcs[0]}
          preload="auto" // alternative - use preload="metadata" to reduce bandwidth usage
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
          onEnded={handleVideoEnded}
          playsInline
        />
        {/* Layer 1: current page or precached adjacent page. Preload="auto". */}
        <video
          ref={video1Ref}
          src={videoSrcs[1]}
          preload="auto" // alternative - use preload="metadata" to reduce bandwidth usage
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
          className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 text-text-main dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Prev
        </button>

        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center size-12 bg-primary hover:bg-primary-dark text-slate-900 rounded-full font-bold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 transform hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span className="material-symbols-outlined text-[24px]!">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === magazinePages.length - 1}
          className={`flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 text-text-main dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary 
            ${isVideoEnded && currentPage !== magazinePages.length - 1 ? "ring-4 ring-primary/50 animate-pulse bg-primary/20" : ""}`}
        >
          Next
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );
}


// ========================
// MAIN PAGE COMPONENT
// ========================
export default function ReadHttn() {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null);
  const [loadingIssueId, setLoadingIssueId] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  // Derive recent issue to "Continue Reading"
  const recentReadingContext = useMemo(() => {
    // Only derived on mount/selectedIssue change
    const lastReadId = localStorage.getItem('httn-last-read-issue');
    if (!lastReadId) return null;

    const savedProgressStr = localStorage.getItem(`httn-progress-${lastReadId}`);
    if (!savedProgressStr) return null;

    let pageNum = 0;
    try {
      const parsed = JSON.parse(savedProgressStr);
      pageNum = typeof parsed === 'number' ? parsed : parsed.page || 0;
    } catch {
      pageNum = parseInt(savedProgressStr, 10) || 0;
    }

    if (pageNum > 0) {
      const issue = MAGAZINE_ISSUES.find(i => i.id === lastReadId);
      if (issue) {
        return { issue, pageNum };
      }
    }
    return null;
  }, [selectedIssue]); // intentionally re-evaluate when we return from reading

  const handleSelectIssue = async (issue: MagazineIssue) => {
    setLoadingIssueId(issue.id);
    setHasError(false);
    
    try {
      // Lazy load only the FIRST video of the selected issue just to verify it can load
      const firstVideoUrl = issue.pages[0].video;
      
      await new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = firstVideoUrl;
        video.onloadeddata = resolve;
        video.onerror = reject;
        
        // Timeout to simulate an error if connection is very poor
        setTimeout(() => reject(new Error("Timeout")), 10000);
      });

      // Artificial small delay for visual feedback of loading
      await new Promise(res => setTimeout(res, 800));

      setSelectedIssue(issue);
    } catch (error) {
      console.error("Failed to load issue:", error);
      setHasError(true);
    } finally {
      setLoadingIssueId(null);
    }
  };

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

      <AnimatePresence mode="wait">
        {!selectedIssue ? (
          <motion.main 
            key="library"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center"
          >
            <header className="mb-12 text-center max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-text-main dark:text-white mb-4 tracking-tight">
                Explore The HTTN Magazine for Kids
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Select an issue below to start reading, coloring, and learning! Your progress is automatically saved.
              </p>
            </header>

            <AnimatePresence>
              {hasError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 w-full max-w-lg"
                >
                  <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl w-full text-center">
                    <ExclamationTriangleIcon className="size-10 text-red-500 mb-3" />
                    <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Oops, try again</h3>
                    <p className="text-red-700 dark:text-red-300">
                      We had trouble opening that issue. Please check your connection and try again.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONTINUE READING SECTION */}
            {recentReadingContext && (
              <div className="w-full max-w-5xl mb-12">
                <h2 className="text-2xl font-black text-text-main dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">history</span>
                  Continue Reading
                </h2>
                
                <button
                  onClick={() => handleSelectIssue(recentReadingContext.issue)}
                  disabled={loadingIssueId !== null}
                  className="w-full sm:w-auto min-w-[300px] group relative flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/50 text-left"
                >
                  {/* Thumbnail */}
                  <div className="w-24 aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative hidden sm:block shrink-0">
                    <video 
                      src={recentReadingContext.issue.cover} 
                      preload="metadata"
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500" 
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-text-main dark:text-white line-clamp-1">
                      {recentReadingContext.issue.month} Issue
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">
                      Page {recentReadingContext.pageNum + 1}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 dark:bg-primary/20 w-fit px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-amber-950 transition-colors">
                      <PlayIcon className="size-4" />
                      Resume
                    </div>
                  </div>

                  {/* Absolute Loading State */}
                  {loadingIssueId === recentReadingContext.issue.id && (
                     <div className="absolute inset-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-text-main dark:text-white rounded-2xl">
                       <ArrowPathIcon className="size-8 animate-spin text-primary" />
                     </div>
                  )}
                </button>
              </div>
            )}

            {/* LIBRARY GRID SECTION */}
            <div className="w-full max-w-5xl">
              <h2 className="text-2xl font-black text-text-main dark:text-white mb-6">
                All Issues
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {MAGAZINE_ISSUES.map((issue) => {
                  const isLoadingThis = loadingIssueId === issue.id;

                  // Get saved progress specifically to check if they have started it
                  let hasStarted = false;
                  if (typeof window !== 'undefined') {
                    const saved = localStorage.getItem(`httn-progress-${issue.id}`);
                    if (saved) {
                       try {
                         const p = JSON.parse(saved);
                         hasStarted = (typeof p === 'number' ? p : p.page) > 0;
                       } catch {
                         hasStarted = parseInt(saved, 10) > 0;
                       }
                    }
                  }

                  return (
                    <button
                      key={issue.id}
                      onClick={() => handleSelectIssue(issue)}
                      disabled={loadingIssueId !== null}
                      className="group relative flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50"
                    >
                      {/* Aspect ratio container matching standard magazine cover (approx 1:1.414 for A4, or 3:4) */}
                      <div className="w-full aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800 relative isolation-auto">
                        {/* Lazy load metadata of the cover video */}
                        <video 
                          src={issue.cover} 
                          preload="metadata"
                          className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500" 
                          muted
                          playsInline
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="text-primary font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm flex items-center gap-2">
                             Read Issue
                             <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </span>
                        </div>

                        {/* Loading Overlay */}
                        <AnimatePresence>
                          {isLoadingThis && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white"
                            >
                              <ArrowPathIcon className="size-12 animate-spin text-primary mb-3" />
                              <span className="font-bold tracking-wide">Loading...</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="w-full p-6 relative bg-white dark:bg-slate-900 z-10 flex-1 flex flex-col">
                        <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white mb-1">
                          {issue.title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          {issue.description}
                        </p>
                        
                        {/* Status badge - visual cue if they have progress, but only if it's NOT the globally active recent one */}
                        {hasStarted && (!recentReadingContext || recentReadingContext.issue.id !== issue.id) && (
                          <span className="absolute top-0 right-6 -translate-y-1/2 bg-blue-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                            In Progress
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.main>
        ) : (
          <MagazineReader key={selectedIssue.id} issue={selectedIssue} onBack={() => setSelectedIssue(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
