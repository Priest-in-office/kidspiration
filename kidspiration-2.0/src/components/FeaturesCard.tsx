import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type IconAnimation = "spin" | "flip" | "bounce" | "swing" | "shake";

interface FeaturesCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  iconAnimation?: IconAnimation;
  link?: string;
}

const MAX_TILT = 15; // degrees

/* ── CSS keyframes (injected once) ── */
const styleId = "features-card-icon-animations";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes fc-spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fc-flip {
      0%   { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    @keyframes fc-bounce {
      0%, 100% { transform: translateY(0); }
      30%      { transform: translateY(-8px); }
      50%      { transform: translateY(0); }
      70%      { transform: translateY(-4px); }
    }
    @keyframes fc-swing {
      0%   { transform: rotate(0deg); }
      25%  { transform: rotate(15deg); }
      50%  { transform: rotate(-10deg); }
      75%  { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes fc-shake {
      0%, 100% { transform: translateX(0); }
      20%      { transform: translateX(-3px) rotate(-5deg); }
      40%      { transform: translateX(3px) rotate(5deg); }
      60%      { transform: translateX(-2px) rotate(-3deg); }
      80%      { transform: translateX(2px) rotate(3deg); }
    }
  `;
  document.head.appendChild(style);
}

const animationMap: Record<IconAnimation, string> = {
  spin: "fc-spin 0.6s ease-in-out",
  flip: "fc-flip 0.6s ease-in-out",
  bounce: "fc-bounce 0.5s ease-in-out",
  swing: "fc-swing 0.5s ease-in-out",
  shake: "fc-shake 0.4s ease-in-out",
};

export default function FeaturesCard({
  title,
  description,
  imageUrl,
  icon,
  iconAnimation,
  link,
}: FeaturesCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * MAX_TILT * 2,
      rotateY: (x - 0.5) * MAX_TILT * 2,
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = () => {
    if (!link) return;
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link);
    }
  };

  const iconStyle: React.CSSProperties =
    isHovered && iconAnimation
      ? { animation: animationMap[iconAnimation], display: "inline-block" }
      : { display: "inline-block" };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={link ? "cursor-pointer" : ""}
      role={link ? "link" : undefined}
      style={{ perspective: "800px" }}
    >
      <div
        className="group flex flex-col gap-4 p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.4s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
          <div
            className="w-full h-full bg-contain bg-center transform group-hover:scale-105 transition-transform duration-500"
            data-alt={title}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="material-symbols-outlined text-primary"
              style={iconStyle}
            >
              {icon}
            </span>
            <h3 className="text-text-main dark:text-white text-xl font-bold leading-normal">
              {title}
            </h3>
          </div>
          <p className="text-text-muted dark:text-stone-400 text-base font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
