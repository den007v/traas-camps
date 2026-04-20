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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Ignore autoplay rejections (browser policy/user gesture).
        });
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      if (video.paused || video.readyState < 2) {
        video.load();
        tryPlay();
      }
    };

    const onPageShow = () => {
      if (video.paused) tryPlay();
    };

    const onStalled = () => {
      video.load();
      tryPlay();
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("stalled", onStalled);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onPageShow);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("stalled", onStalled);
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
