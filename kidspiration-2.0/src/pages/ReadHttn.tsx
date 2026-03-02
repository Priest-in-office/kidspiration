import { useState, useRef, useEffect } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Colors for the palette (Kidspiration theme + basics)
const COLORS = [
  "#f4c025", // Primary Yellow
  "#4aa9ff", // Accent Blue
  "#ff6b6b", // Accent Red
  "#4db870", // Green
  "#a478e8", // Purple
  "#000000", // Black
  "#ffffff", // White
];

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
  const [currentPage, setCurrentPage] = useState(0);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Coloring State & Refs ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [isEraser, setIsEraser] = useState(false);
  const [brushSize, setBrushSize] = useState(8);

  // Store drawings per page: Record<pageIndex, imageDataURL>
  const [savedDrawings, setSavedDrawings] = useState<Record<number, string>>(
    {},
  );

  // Reset/Restore canvas when page changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear current canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If there is a saved drawing for this page, load it
    if (savedDrawings[currentPage]) {
      const img = new Image();
      img.src = savedDrawings[currentPage];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [currentPage, savedDrawings]); // Added savedDrawings to dependencies

  // Handle resizing canvas to match video container size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;

      // Save current drawing data before resize clears it
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tCtx = tempCanvas.getContext("2d");
      if (tCtx) {
        // Added null check for tCtx
        tCtx.drawImage(canvas, 0, 0);
      }

      // Match parent dimensions
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Restore drawing
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.drawImage(
          tempCanvas,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run once on mount

  const saveCurrentDrawing = () => {
    if (canvasRef.current) {
      setSavedDrawings((prev) => ({
        ...prev,
        [currentPage]: canvasRef.current!.toDataURL(),
      }));
    }
  };

  const getCoordinates = (
    e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as ReactMouseEvent).clientX;
      clientY = (e as ReactMouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (
    e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>,
  ) => {
    if (!COLORING_PAGES.includes(currentPage)) return;
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (
    e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing || !COLORING_PAGES.includes(currentPage)) return;
    e.preventDefault(); // Prevent scrolling on touch

    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      if (isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSize * 2; // Eraser is bigger
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = brushSize;
      }
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) ctx.closePath();
      setIsDrawing(false);
      saveCurrentDrawing();
    }
  };
  // --- End Coloring State ---

  // We keep two sources, one for each video element layer.
  // Initially, Layer 0 plays Page 1 (index 0). Layer 1 preloads Page 2 (index 1).
  const [videoSrcs, setVideoSrcs] = useState<[string, string]>([
    MAGAZINE_PAGES[0],
    MAGAZINE_PAGES[1] || "",
  ]);

  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const containerWrapRef = useRef<HTMLDivElement>(null);

  // When changing pages
  const goToPage = (newIndex: number) => {
    if (
      newIndex < 0 ||
      newIndex >= MAGAZINE_PAGES.length ||
      newIndex === currentPage
    )
      return;

    const isNext = newIndex === currentPage + 1;
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
    if (currentPage < MAGAZINE_PAGES.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await containerWrapRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
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
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans">
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
        <div
          ref={containerWrapRef}
          className={`relative group flex justify-center items-center ${
            isFullscreen
              ? "w-screen h-screen bg-black"
              : "w-full max-w-[500px] md:max-w-[650px]"
          }`}
        >
          <div
            className={`relative w-full shadow-xl overflow-hidden bg-black transition-all ${
              isFullscreen
                ? "h-full max-h-screen aspect-[1/1.414]"
                : "aspect-[1/1.414] rounded-2xl md:rounded-3xl ring-1 ring-slate-200 dark:ring-slate-800"
            }`}
          >
            {/* Layer 0 */}
            <video
              ref={video0Ref}
              src={videoSrcs[0]}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                activeLayer === 0
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              onEnded={handleVideoEnded}
              playsInline
            />

            {/* Layer 1 */}
            <video
              ref={video1Ref}
              src={videoSrcs[1]}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                activeLayer === 1
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              onEnded={handleVideoEnded}
              playsInline
            />

            {/* Interactive Coloring Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full z-20 touch-none transition-opacity duration-300 ${
                COLORING_PAGES.includes(currentPage)
                  ? "opacity-100 cursor-crosshair"
                  : "opacity-0 pointer-events-none"
              }`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onTouchCancel={stopDrawing}
            />
          </div>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 z-30 p-2 md:p-3 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm shadow-md"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <span className="material-symbols-outlined !text-2xl md:!text-3xl">
              {isFullscreen ? "fullscreen_exit" : "fullscreen"}
            </span>
          </button>
        </div>

        {/* --- Coloring Palette UI (Only visible on coloring pages) --- */}
        <div
          className={`transition-all duration-300 overflow-hidden flex flex-col items-center mt-6 w-full ${
            COLORING_PAGES.includes(currentPage)
              ? "max-h-60 opacity-100" // Increased max-h to allow wrapping
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap justify-center bg-white dark:bg-slate-800 p-3 rounded-2xl md:rounded-[2rem] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 gap-3 md:gap-4 items-center w-full max-w-2xl">
            {/* Color Swatches Grid (wraps on mobile) */}
            <div className="flex flex-wrap justify-center gap-2 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-3 md:pb-0 w-full md:w-auto">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setActiveColor(color);
                    setIsEraser(false);
                  }}
                  className={`size-8 md:size-10 rounded-full transition-transform shrink-0 ${
                    !isEraser && activeColor === color
                      ? "scale-110 ring-4 ring-primary/50"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color,
                    border: color === "#ffffff" ? "1px solid #e2e8f0" : "none",
                  }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 py-1">
              {/* Eraser Button */}
              <button
                onClick={() => setIsEraser(true)}
                className={`flex items-center justify-center size-10 md:size-11 rounded-xl transition-all shrink-0 ${
                  isEraser
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white ring-4 ring-slate-300/50 dark:ring-slate-600/50"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                title="Eraser"
              >
                <span className="material-symbols-outlined !text-[24px]">
                  ink_eraser
                </span>
              </button>

              {/* Brush Size Slider */}
              <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                  Size
                </span>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20 md:w-28 accent-primary cursor-pointer"
                  title="Brush Size"
                />
              </div>
            </div>
          </div>
        </div>
        {/* --- End Palette --- */}

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
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 text-text-main dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary"
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
