"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui/primitives";

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

/**
 * Showreel player.
 * - Starts from the beginning the first time it's mostly on screen, so viewers
 *   see the piece as it was cut — not a random middle frame.
 * - Pauses when it leaves the viewport, resumes when it returns.
 * - Click to play/pause; scrubbable progress; restart; fullscreen.
 * - Under reduced motion it waits for an explicit play.
 */
export function ReelPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const userPaused = useRef(false);
  const started = useRef(false);

  const play = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (!v.getAttribute("src")) v.src = src;
    v.play().catch(() => {});
  }, [src]);

  useEffect(() => {
    const v = video.current;
    const w = wrap.current;
    if (!v || !w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Warm the file up shortly before it's visible so playback starts instantly.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !v.getAttribute("src")) {
          v.preload = "auto";
          v.src = src;
        }
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(w);

    const inView = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.6) {
          if (reduce || userPaused.current) return;
          if (!started.current) {
            started.current = true;
            v.currentTime = 0;
          }
          play();
        } else if (e.intersectionRatio < 0.25) {
          v.pause();
        }
      },
      { threshold: [0, 0.25, 0.6, 1] },
    );
    inView.observe(w);

    const onTime = () => {
      setTime(v.currentTime);
      setProgress(v.duration ? v.currentTime / v.duration : 0);
    };
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      near.disconnect();
      inView.disconnect();
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [src, play]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      started.current = true;
      play();
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const restart = () => {
    const v = video.current;
    if (!v) return;
    userPaused.current = false;
    started.current = true;
    v.currentTime = 0;
    play();
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * v.duration;
  };

  const fullscreen = () => {
    const w = wrap.current;
    if (!w) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else w.requestFullscreen?.();
  };

  return (
    <div ref={wrap} className="group/reel relative size-full overflow-hidden bg-[#030B1A]">
      <video
        ref={video}
        className="size-full cursor-pointer object-contain"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onClick={toggle}
      />

      {/* Big centre play button when paused */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause showreel" : "Play showreel"}
        className={cx(
          "absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[rgba(3,11,26,0.55)] text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan hover:text-cyan",
          playing ? "pointer-events-none scale-90 opacity-0" : "opacity-100",
        )}
      >
        <svg viewBox="0 0 24 24" className="ml-1 size-7" aria-hidden="true">
          <path d="M7 4.5v15l12-7.5Z" fill="currentColor" />
        </svg>
      </button>

      {/* Control bar — fades in on hover / while paused */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-[rgba(3,11,26,0.9)] to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 sm:px-6",
          playing ? "opacity-0 group-hover/reel:opacity-100 focus-within:opacity-100" : "opacity-100",
        )}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid size-9 place-items-center rounded-full text-white hover:text-cyan"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" aria-hidden="true">
              <path d="M7 4.5v15l12-7.5Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={restart}
          aria-label="Restart"
          className="grid size-9 place-items-center rounded-full text-white hover:text-cyan"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(time)}
          onPointerDown={seek}
          onKeyDown={(e) => {
            const v = video.current;
            if (!v) return;
            if (e.key === "ArrowRight") v.currentTime = Math.min(v.duration, v.currentTime + 2);
            if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 2);
          }}
          className="relative h-6 flex-1 cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/20" />
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-volt to-cyan"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="font-mono text-[11px] tabular-nums tracking-[0.06em] text-white/80">
          {fmt(time)} / {fmt(duration)}
        </span>
        <button
          type="button"
          onClick={fullscreen}
          aria-label="Fullscreen"
          className="grid size-9 place-items-center rounded-full text-white hover:text-cyan"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
