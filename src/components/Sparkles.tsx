import { useEffect, useState } from "react";

export function Sparkles({ count = 20 }: { count?: number }) {
  const [items, setItems] = useState<Array<{ left: number; top: number; size: number; delay: number }>>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 8 + Math.random() * 14,
        delay: Math.random() * 2,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-gold"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
