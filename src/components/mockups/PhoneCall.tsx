/**
 * A phone on a live call with the Ghia AI receptionist, over a voice
 * waveform. Built in code (no image), labelled as illustrative.
 */

const BARS = [18, 34, 52, 30, 66, 88, 58, 40, 74, 96, 62, 44, 28, 56, 82, 48, 30, 20];
const MINI = [10, 20, 32, 22, 38, 26, 16, 30, 18, 10];

export function PhoneCall({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="relative mx-auto flex h-[440px] max-w-[460px] items-center justify-center">
        {/* waveform behind the phone */}
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-[6px] rounded-full bg-gradient-to-b from-[#7b93ff] to-[#2b4dff] opacity-60"
              style={{ height: `${h * 2.4}px` }}
            />
          ))}
        </div>

        {/* phone */}
        <div className="relative h-[430px] w-[220px] rotate-[7deg] rounded-[40px] border border-[#aab6ee]/50 bg-[#1b2350] p-[7px] shadow-[0_30px_80px_-20px_rgba(43,77,255,0.7)]">
          <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[33px] bg-gradient-to-b from-[#0d1530] to-[#03060f] px-5 pb-6 pt-4">
            <span aria-hidden="true" className="h-[18px] w-[70px] rounded-full bg-black" />

            <div className="relative mt-12 grid size-[86px] place-items-center">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#2b4dff] opacity-60 blur-xl" />
              <span className="relative flex size-[76px] items-center justify-center gap-[3px] rounded-full bg-gradient-to-br from-[#4f6bff] to-[#2330c9] ring-1 ring-white/25">
                {MINI.map((h, i) => (
                  <span key={i} className="w-[3px] rounded-full bg-white/90" style={{ height: `${h * 0.9}px` }} />
                ))}
              </span>
            </div>

            <p className="mt-7 text-center font-display text-[19px] font-light leading-6 text-white">
              Ghia AI
              <br />
              Receptionist
            </p>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-[#9fb4ff]">
              <span className="size-1.5 rounded-full bg-[#3ee07f]" />
              On call · 00:42
            </p>

            <div className="mt-auto flex w-full items-center justify-between px-1">
              <span className="grid size-11 place-items-center rounded-full bg-white/10 text-white">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
                </svg>
              </span>
              <span className="grid size-14 place-items-center rounded-full bg-[#ff3b4e] text-white shadow-[0_8px_24px_-6px_rgba(255,59,78,0.8)]">
                <svg viewBox="0 0 24 24" className="size-6 rotate-[135deg]" fill="currentColor">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                </svg>
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-white/10 text-white">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                  <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        Illustrative interface
      </figcaption>
    </figure>
  );
}
