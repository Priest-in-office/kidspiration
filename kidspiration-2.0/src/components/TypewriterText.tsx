import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  highlightStart?: number;
}

export default function TypewriterText({
  text,
  speed = 90,
  highlightStart = 11,
}: TypewriterTextProps) {
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (typedCount < text.length) {
      const timer = setTimeout(() => setTypedCount((c) => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      setTypingDone(true);
    }
  }, [typedCount, text.length, speed]);

  return (
    <>
      {text.slice(0, Math.min(typedCount, highlightStart))}
      {/* Wavy underline highlight for the "Kidspiration!" part */}
      {typedCount > highlightStart && (
        <span className="text-primary"> 
        {/* The className for the wavy underline - underline decoration-wavy decoration-4 underline-offset-4*/}
          {text.slice(highlightStart, typedCount)}
        </span>
      )}
      {!typingDone && (
        <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" />
      )}
    </>
  );
}
