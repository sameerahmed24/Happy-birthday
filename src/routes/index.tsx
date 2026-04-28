import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BirthdayCake } from "@/components/BirthdayCake";
import { Confetti } from "@/components/Confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Sparkles } from "../components/Sparkles";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Beautiful! 🎂" },
      { name: "description", content: "A magical birthday surprise just for you — make a wish!" },
    ],
  }),
});

const WISHES = [
  "May your day sparkle brighter than every candle on this cake ✨",
  "You deserve all the cake, all the love, and every single dream 💖",
  "Another year of being absolutely, magnificently you 🌸",
  "Wishing you a year filled with giggles, glitter & glow 🦄",
  "You are the main character — own this beautiful day 👑",
];

function Index() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const [wishIdx, setWishIdx] = useState(0);
  const [name, setName] = useState("Fatima");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConfetti(true), 300);
    return () => clearTimeout(t);
  }, []);

  const blow = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
  };

  const relight = () => {
    setCandlesLit(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  return (
    <main
      className="relative h-screen w-screen overflow-hidden px-3 py-2 flex flex-col"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Confetti active={confetti} />
      <FloatingHearts count={10} />
      <Sparkles count={14} />

      <div className="relative mx-auto flex h-full w-full max-w-md flex-col items-center text-center gap-3 py-2">
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary/80 animate-bounce-in">
            A surprise for
          </p>

          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
              className="my-1 w-full max-w-[280px] rounded-xl border-2 border-primary/40 bg-white/70 px-3 py-2 text-center text-3xl sm:text-4xl font-bold text-primary outline-none backdrop-blur"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="mb-1 text-3xl sm:text-4xl font-bold text-foreground/80 underline decoration-primary/40 decoration-wavy underline-offset-4 px-2"
            >
              {name} ✏️
            </button>
          )}

          <h1
            className="shimmer-text text-4xl sm:text-5xl font-black leading-none tracking-tight animate-bounce-in"
            style={{ fontFamily: "Georgia, serif", animationDelay: "0.2s" }}
          >
            Happy Birthday!
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-center w-full min-h-0 my-1">
          <div className="w-full max-w-[280px] sm:max-w-[320px] animate-bounce-in" style={{ animationDelay: "0.6s" }}>
            <BirthdayCake candlesLit={candlesLit} onBlow={blow} />
          </div>
        </div>

        {!candlesLit ? (
          <div className="w-full animate-bounce-in rounded-2xl bg-white/60 px-4 py-3 backdrop-blur-md shadow-soft border border-white/80">
            <p className="text-sm font-semibold text-primary">🎉 Your wish is on its way!</p>
            <p className="mt-1 text-xs text-foreground/80 italic leading-snug line-clamp-2">
              "{WISHES[wishIdx]}"
            </p>
            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => setWishIdx((i) => (i + 1) % WISHES.length)}
                size="sm"
                className="flex-1 h-8 text-xs rounded-full bg-gradient-to-r from-primary to-rose text-primary-foreground"
              >
                💌 Another wish
              </Button>
              <Button
                onClick={relight}
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-xs rounded-full border-primary/40 bg-white/60 text-primary hover:bg-white"
              >
                🕯️ Light again
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-wrap justify-center gap-2 text-3xl">
              {["🎂", "🎁", "🎈", "🌸", "💖", "🦄", "👑", "🍓"].map((e, i) => (
                <span
                  key={i}
                  className="animate-wiggle inline-block"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {e}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-foreground/60">Made with 💕 just for you</p>
          </div>
        )}
      </div>
    </main>
  );
}
