import { ReelPlayer } from "@/components/motion/ReelPlayer";
import { Container } from "@/components/ui/primitives";

/**
 * Cinema-style showreel: the whole section is one screen tall and the video is
 * sized to fit inside it, so when scrolling settles here the full frame is in
 * view — nothing cropped by the nav or the bottom of the window.
 */
export function ReelSection() {
  return (
    <section
      data-section="Showreel"
      id="showreel"
      className="theme-ink relative flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center py-6 sm:py-8"
      aria-labelledby="reel-title"
    >
      <Container wide className="flex flex-col">
        <div className="mx-auto mb-5 flex w-full max-w-[min(100%,calc((100svh-var(--nav-height)-235px)*16/9))] flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3" data-scramble>
              Showreel
            </p>
            <h2 id="reel-title" className="t-h1 text-ink" data-split="words">
              Every channel, <span className="grad">one motion.</span>
            </h2>
          </div>
          <p className="t-body-sm max-w-[22rem] sm:text-right">
            Marketplaces, search, paid media, web and AI agents — designed, built and run by one team.
          </p>
        </div>
        <div className="glass mx-auto w-full max-w-[min(100%,calc((100svh-var(--nav-height)-235px)*16/9+24px))] rounded-[26px] p-2 shadow-[0_40px_120px_-30px_rgba(22,120,232,0.5)] sm:p-3">
          <div className="reel-frame aspect-video w-full overflow-hidden rounded-[18px]">
            <ReelPlayer src="/motion/reel.mp4" poster="/motion/reel.jpg" label="Ghia Technologies showreel" />
          </div>
        </div>
      </Container>
    </section>
  );
}
