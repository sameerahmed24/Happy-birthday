import { useEffect, useState } from "react";

const ICONS = ["💖", "🎂", "🎈", "✨", "🌸", "🦄", "💕", "🍰", "🌟", "🎀"];

type Item = { left: number; delay: number; duration: number; size: number; icon: string };

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 18 + Math.random() * 22,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute animate-float-up"
          style={{
            left: `${it.left}%`,
            bottom: 0,
            fontSize: it.size,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
          }}
        >
          {it.icon}
        </span>
      ))}
    </div>
  );
}
