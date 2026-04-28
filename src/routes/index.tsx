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
      className="relative flex h-dvh max-h-dvh min-h-0 w-screen flex-col overflow-hidden overscroll-none px-2 pt-[max(0.25rem,env(safe-area-inset-top))] pb-[max(0.25rem,env(safe-area-inset-bottom))] sm:px-3 sm:py-1"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Confetti active={confetti} />
      <FloatingHearts count={10} />
      <Sparkles count={14} />

      <div
        className={`relative mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col items-center gap-1 px-1 text-center sm:gap-2 md:gap-3 ${
          !candlesLit ? "justify-center" : ""
        }`}
      >
        <div className="shrink-0 flex flex-col items-center gap-0.5">
          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-primary/80 animate-bounce-in sm:text-[10px] sm:tracking-[0.3em]">
            A surprise for
          </p>

          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
              className="my-0.5 w-full max-w-[min(280px,88vw)] rounded-lg border-2 border-primary/40 bg-white/70 px-2 py-1 text-center text-2xl font-bold text-primary outline-none backdrop-blur sm:my-1 sm:rounded-xl sm:px-3 sm:py-2 sm:text-3xl md:text-4xl"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-2xl font-bold leading-tight text-foreground/80 underline decoration-primary/40 decoration-wavy underline-offset-2 sm:text-3xl md:text-4xl sm:underline-offset-4"
            >
              {name} ✏️
            </button>
          )}

          <h1
            className="shimmer-text mt-3 animate-bounce-in text-[clamp(1.5rem,7.5vw,2.75rem)] font-black leading-[1.05] tracking-tight sm:mt-4 sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Georgia, serif", animationDelay: "0.2s" }}
          >
            Happy Birthday!
          </h1>
        </div>

        <div
          className={
            candlesLit
              ? "flex min-h-0 w-full flex-1 flex-col items-center justify-center py-0.5"
              : "flex w-full shrink-0 flex-col items-center justify-center py-0.5"
          }
        >
          <div
            className="w-full max-w-[min(320px,92vw)] animate-bounce-in sm:max-w-[320px]"
            style={{ animationDelay: "0.6s" }}
          >
            <BirthdayCake candlesLit={candlesLit} onBlow={blow} />
          </div>
        </div>

        {!candlesLit ? (
          <div className="mt-3 w-full shrink-0 animate-bounce-in rounded-xl border border-white/80 bg-white/60 px-3 py-2 shadow-soft backdrop-blur-md sm:mt-4 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs font-semibold text-primary sm:text-sm">
              🎉 Your wish is on its way!
            </p>
            <p className="mt-0.5 text-[11px] italic leading-snug text-foreground/80 line-clamp-2 sm:mt-1 sm:text-xs">
              "{WISHES[wishIdx]}"
            </p>
            <div className="mt-1.5 flex gap-1.5 sm:mt-2 sm:gap-2">
              <Button
                onClick={() => setWishIdx((i) => (i + 1) % WISHES.length)}
                size="sm"
                className="h-7 flex-1 rounded-full bg-linear-to-r from-primary to-rose px-2 text-[10px] text-primary-foreground sm:h-8 sm:text-xs"
              >
                💌 Another wish
              </Button>
              <Button
                onClick={relight}
                size="sm"
                variant="outline"
                className="h-7 flex-1 rounded-full border-primary/40 bg-white/60 px-2 text-[10px] text-primary hover:bg-white sm:h-8 sm:text-xs"
              >
                🕯️ Light again
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full shrink-0 flex-col items-center gap-0.5 pb-0.5">
            <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-xl sm:gap-2 sm:text-3xl">
              {["🎂", "🎁", "🎈", "🌸", "💖", "🦄", "👑", "🍓"].map((e, i) => (
                <span
                  key={i}
                  className="animate-wiggle inline-block leading-none"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {e}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-foreground/60 sm:text-[10px]">
              Made with 💕 just for you
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
