import { useEffect, useState } from "react";

const COLORS = ["#ff5fa2", "#ffb3d1", "#ffd166", "#ff8fa3", "#c77dff", "#ff6b9d", "#ffe66d"];

type Piece = {
  left: number; delay: number; duration: number; color: string;
  size: number; rotate: number; shape: string;
};

export function Confetti({ count = 80, active = true }: { count?: number; active?: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    setPieces(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        shape: Math.random() > 0.5 ? "50%" : "2px",
      })),
    );
  }, [count, active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
