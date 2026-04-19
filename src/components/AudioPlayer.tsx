"use client";

import { useEffect, useRef, useState } from "react";

export function AudioPlayer({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onReady = () => setReady(true);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    el.addEventListener("canplay", onReady);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
      el.removeEventListener("canplay", onReady);
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-savage-yellow/60 bg-savage-black/85 px-3 py-2 backdrop-blur-md shadow-2xl">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-savage-yellow text-savage-ink transition hover:brightness-110"
      >
        {playing ? (
          <span className="block h-3 w-3 border-l-[3px] border-r-[3px] border-savage-ink" />
        ) : (
          <span className="block h-0 w-0 border-l-[10px] border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent border-l-savage-ink ml-1" />
        )}
      </button>
      <div className="flex flex-col pr-3 leading-tight">
        <span className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow">
          {playing ? "Now playing" : ready ? "Savage radio" : "Loading"}
        </span>
        <span className="text-sm text-savage-white">{label}</span>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" loop />
    </div>
  );
}
