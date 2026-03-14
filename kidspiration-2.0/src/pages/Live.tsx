import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LIVE_STREAM_URL =
  "https://vcpout-ams01.internetmultimediaonline.org/vcp/HSLST20bhgb23nc/playlist.m3u8";
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY_MS = 2500;

export default function Live() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let hls: Hls | null = null;
    let reconnectAttempts = 0;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    const clearError = () => setHasError(false);

    videoElement.addEventListener("playing", clearError);
    videoElement.addEventListener("canplay", clearError);

    const clearReconnectTimer = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const initHls = () => {
      hls = new Hls();
      hls.loadSource(LIVE_STREAM_URL);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        reconnectAttempts = 0;
        clearError();
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return;

        setHasError(true);

        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;

        reconnectAttempts += 1;
        clearReconnectTimer();
        reconnectTimer = setTimeout(() => {
          if (hls) hls.destroy();

          initHls();
          void videoElement.play().catch(() => {
            setHasError(true);
          });
        }, RECONNECT_DELAY_MS);
      });
    };

    const playStream = async () => {
      try {
        if (Hls.isSupported()) {
          initHls();
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = LIVE_STREAM_URL;
        } else {
          setHasError(true);
        }
        await videoElement.play();
      } catch {
        setHasError(true);
      }
    };

    void playStream();

    return () => {
      videoElement.removeEventListener("playing", clearError);
      videoElement.removeEventListener("canplay", clearError);
      clearReconnectTimer();

      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-400 w-full mx-auto p-4 md:p-6 md:pb-10">
        <div className="w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="w-full h-full bg-black"
            aria-label="Live service stream"
          />

          {/* Removed pulsing live badge */}
          {/* <div className="absolute top-4 left-4 flex items-center gap-2 bg-accent-red/90 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm pointer-events-none">
            <span className="size-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div> */}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/75 text-white text-center px-6">
              <p className="max-w-md text-sm md:text-base">
                Unable to load the live stream right now. Please try again in a
                moment.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 px-1">
          <h1 className="text-2xl md:text-3xl font-black font-display text-text-main dark:text-white leading-tight">
            Healing Streams Live Healing Services with Pastor Chris
          </h1>
          <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            You are watching the ongoing live service.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
