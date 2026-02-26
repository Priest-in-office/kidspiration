import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** YouTube video ID, e.g. "dQw4w9WgXcQ" */
  videoId?: string;
  /** Or provide a direct video URL (mp4, etc.) */
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
  videoUrl,
  title = "Watch Our Story",
}: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          Close
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-white font-bold text-lg mb-4">{title}</h2>
        )}

        {/* Video container */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
          {videoId ? (
            // YouTube embed
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : videoUrl ? (
            // Direct video
            <video
              className="w-full aspect-video"
              src={videoUrl}
              controls
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            // Placeholder
            <div className="w-full aspect-video flex flex-col items-center justify-center text-white/60 gap-4">
              <span className="material-symbols-outlined text-6xl">
                play_circle
              </span>
              <p className="text-sm">No video source provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
