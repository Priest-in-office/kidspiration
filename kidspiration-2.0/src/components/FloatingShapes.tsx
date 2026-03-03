const FLOATING_SHAPES = [
  {
    color: "#5BC5F2",
    type: "star",
    left: "5%",
    bottom: "-2rem",
    className: "float-emoji-1",
    size: 28,
  },
  {
    color: "#FF7E67",
    type: "heart",
    left: "20%",
    bottom: "-2rem",
    className: "float-emoji-2",
    size: 24,
  },
  {
    color: "#F4C025",
    type: "circle",
    left: "35%",
    bottom: "-2rem",
    className: "float-emoji-3",
    size: 20,
  },
  {
    color: "#4DB870",
    type: "diamond",
    left: "55%",
    bottom: "-2rem",
    className: "float-emoji-4",
    size: 22,
  },
  {
    color: "#F4C025",
    type: "star",
    left: "70%",
    bottom: "-2rem",
    className: "float-emoji-5",
    size: 24,
  },
  {
    color: "#5BC5F2",
    type: "heart",
    left: "85%",
    bottom: "-2rem",
    className: "float-emoji-6",
    size: 20,
  },
  {
    color: "#FF7E67",
    type: "circle",
    left: "45%",
    bottom: "-2rem",
    className: "float-emoji-7",
    size: 16,
  },
  {
    color: "#5BC5F2",
    type: "diamond",
    left: "92%",
    bottom: "-2rem",
    className: "float-emoji-8",
    size: 18,
  },
];

const ShapeIcon = ({
  type,
  size,
  color,
}: {
  type: string;
  size: number;
  color: string;
}) => {
  if (type === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
      </svg>
    );
  }
  if (type === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  if (type === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L2 12l10 10 10-10z" />
      </svg>
    );
  }
  return null;
};

export default function FloatingShapes() {
  return (
    <>
      {FLOATING_SHAPES.map((shape, index) => (
        <span
          key={index}
          className={`float-emoji ${shape.className}`}
          style={{ left: shape.left, bottom: shape.bottom }}
        >
          <ShapeIcon type={shape.type} size={shape.size} color={shape.color} />
        </span>
      ))}
    </>
  );
}
