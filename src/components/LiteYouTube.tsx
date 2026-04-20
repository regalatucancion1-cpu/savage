"use client";

import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  orientation?: "landscape" | "portrait";
};

export function LiteYouTube({ videoId, title, orientation = "landscape" }: Props) {
  const [playing, setPlaying] = useState(false);
  const aspect = orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div
      className={`group relative ${aspect} overflow-hidden rounded-2xl border border-savage-white/10 bg-savage-ink/60`}
    >
      {playing ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="absolute inset-0 h-full w-full"
        >
          <span
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${thumb})` }}
            aria-hidden
          />
          <span className="absolute inset-0 bg-gradient-to-t from-savage-black/70 via-transparent to-savage-black/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-savage-yellow/70 bg-savage-black/50 text-savage-yellow backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-savage-yellow group-hover:text-savage-ink">
              ▶
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-savage-black/90 to-transparent p-4">
            <span className="font-display uppercase text-sm text-savage-white">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
