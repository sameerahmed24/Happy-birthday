interface Props {
  candlesLit: boolean;
  onBlow: () => void;
}

export function BirthdayCake({ candlesLit, onBlow }: Props) {
  const candles = Array.from({ length: 7 });
  return (
    <button
      onClick={onBlow}
      aria-label="Blow out the candles"
      className="group relative mx-auto block w-full max-w-[320px] cursor-pointer select-none transition-transform active:scale-95"
    >
      {/* Candles */}
      <div className="relative mx-auto flex h-[4.75rem] w-[80%] items-end justify-center gap-1.5 sm:h-24 sm:gap-3">
        {candles.map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {candlesLit && (
              <>
                <div
                  className="absolute -top-4 h-5 w-2.5 rounded-full animate-flicker sm:-top-5 sm:h-6 sm:w-3"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #fff7ad 0%, #ffb84d 40%, #ff5722 80%, transparent 100%)",
                    boxShadow: "0 0 18px #ffb84d, 0 0 36px #ff8a3d",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div className="absolute -top-1 h-1 w-0.5 bg-foreground/60" />
              </>
            )}
            <div
              className="h-12 w-2 rounded-sm shadow-sm sm:h-16 sm:w-2.5"
              style={{
                background:
                  i % 2 === 0
                    ? "repeating-linear-gradient(45deg, #ff79b0 0 6px, #ffd1e1 6px 12px)"
                    : "repeating-linear-gradient(-45deg, #c77dff 0 6px, #e6c7ff 6px 12px)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Top tier */}
      <div className="relative mx-auto -mt-1.5 h-8 w-[78%] rounded-t-[40%] bg-linear-to-b from-[#ffd1e1] to-[#ff79b0] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.1)] sm:-mt-2 sm:h-10">
        <div className="absolute inset-x-0 -bottom-2 mx-auto flex justify-around px-2 sm:px-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2.5 w-2.5 rounded-full bg-[#ffd700] shadow-sm sm:h-3 sm:w-3" />
          ))}
        </div>
      </div>

      {/* Middle tier */}
      <div className="relative mx-auto h-16 w-[88%] bg-linear-to-b from-[#ff8fb8] to-[#ff5fa2] shadow-soft sm:h-20">
        <div className="absolute inset-x-0 top-2 flex justify-around sm:top-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#ffd700] sm:h-2 sm:w-2" />
          ))}
        </div>
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-[radial-gradient(circle,_#fff_2px,_transparent_2px)] [background-size:14px_14px] opacity-60" />
      </div>

      {/* Drip */}
      <svg viewBox="0 0 100 12" className="-mt-px mx-auto block h-2 w-[88%]" preserveAspectRatio="none">
        <path
          d="M0,0 Q5,10 10,2 T20,2 T30,3 T40,1 T50,4 T60,2 T70,3 T80,1 T90,3 T100,2 V0 Z"
          fill="#ffd1e1"
        />
      </svg>

      {/* Bottom tier */}
      <div className="relative mx-auto h-[4.75rem] w-full rounded-b-2xl bg-linear-to-b from-[#ffe0ec] to-[#ffb3d1] shadow-soft sm:h-24">
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-around px-3 sm:px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg leading-none sm:text-2xl">
              🌸
            </span>
          ))}
        </div>
      </div>

      {/* Plate */}
      <div className="mx-auto h-2 w-[110%] -translate-x-[5%] rounded-full bg-linear-to-r from-gold/60 via-gold to-gold/60 shadow-lg sm:h-3" />

      {candlesLit && (
        <p className="mt-2 text-[11px] font-medium leading-tight text-primary animate-pulse sm:mt-3 sm:text-sm">
          ✨ Tap the cake to blow out the candles ✨
        </p>
      )}
    </button>
  );
}
