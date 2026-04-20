"use client";

import { useEffect, useRef } from "react";

export function AutoplayBackgroundVideo({
  webmSrc,
  mp4Src,
  className,
}: {
  webmSrc: string;
  mp4Src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const retryTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.readyState < 2) return;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Retry after a short delay to recover from transient stalls.
          if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
          retryTimerRef.current = window.setTimeout(() => {
            if (!video.paused) return;
            void video.play().catch(() => {
              // Ignore autoplay policy rejections.
            });
          }, 450);
        });
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        video.pause();
        return;
      }
      if (video.paused) {
        tryPlay();
      }
    };

    const onPageShow = () => {
      if (video.paused) tryPlay();
    };

    const onCanPlay = () => {
      if (video.paused) tryPlay();
    };

    const onStalled = () => {
      video.currentTime = Math.max(0, video.currentTime - 0.1);
      tryPlay();
    };

    if (video.readyState >= 2) {
      tryPlay();
    }
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("stalled", onStalled);
    video.addEventListener("waiting", onStalled);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onPageShow);

    return () => {
      if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("waiting", onStalled);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onPageShow);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      aria-hidden
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
