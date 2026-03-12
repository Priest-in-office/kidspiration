import { useState, useRef, useEffect, type ReactNode } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

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

interface InteractiveCanvasProps {
  currentPage: number;
  coloringPages: number[];
  children: ReactNode;
}

export default function InteractiveCanvas({
  currentPage,
  coloringPages,
  children,
}: InteractiveCanvasProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerWrapRef = useRef<HTMLDivElement>(null);

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

  // --- Coloring State & Refs ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [isEraser, setIsEraser] = useState(false);
  const [brushSize, setBrushSize] = useState(8);

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
  }, [currentPage, savedDrawings]);

  // Handle resizing canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;

      // Save current drawing data before resize clears it
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tCtx = tempCanvas.getContext("2d");
      if (tCtx) tCtx.drawImage(canvas, 0, 0);

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
    if (!coloringPages.includes(currentPage)) return;
    isDrawingRef.current = true;
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
    if (!isDrawingRef.current || !coloringPages.includes(currentPage)) return;
    e.preventDefault();

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
    if (isDrawingRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) ctx.closePath();
      isDrawingRef.current = false;
      saveCurrentDrawing();
    }
  };

  return (
    <>
      <div
        ref={containerWrapRef}
        className={`relative group flex justify-center items-center ${
          isFullscreen
            ? "w-full h-screen bg-black"
            : "w-full max-w-[500px] md:max-w-[650px]"
        }`}
      >
        <div
          className={`relative shadow-xl overflow-hidden bg-black transition-all ${
            isFullscreen
              ? "shrink-0"
              : "w-full aspect-[1/1.414] rounded-2xl md:rounded-3xl ring-1 ring-slate-200 dark:ring-slate-800"
          }`}
          style={
            isFullscreen
              ? {
                  width: "100%",
                  maxWidth: "min(100%, 100vh / 1.414)", // Prevents horizontal stretching
                  aspectRatio: "1 / 1.414", // Strict aspect ratio
                }
              : undefined
          }
        >
          {children}

          {/* Interactive Coloring Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full z-20 touch-none transition-opacity duration-300 ${
              coloringPages.includes(currentPage)
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
          <span className="material-symbols-outlined text-2xl! md:text-3xl!">
            {isFullscreen ? "fullscreen_exit" : "fullscreen"}
          </span>
        </button>
      </div>

      {/* --- Coloring Palette UI (Only visible on coloring pages) --- */}
      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col items-center mt-6 w-full ${
          coloringPages.includes(currentPage)
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap justify-center bg-white dark:bg-slate-800 p-3 rounded-2xl md:rounded-[2rem] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 gap-3 md:gap-4 items-center w-full max-w-2xl">
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
              <span className="material-symbols-outlined text-[24px]!">
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
    </>
  );
}
