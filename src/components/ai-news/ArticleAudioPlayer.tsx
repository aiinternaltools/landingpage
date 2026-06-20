"use client";

type ArticleAudioPlayerProps = {
  src: string;
  title?: string;
  duration?: string;
};

export function ArticleAudioPlayer({
  src,
  title = "Weekly audio summary",
  duration,
}: ArticleAudioPlayerProps) {
  return (
    <div className="card-elevated min-w-0 overflow-hidden rounded-2xl p-4 sm:p-5 md:p-6">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">Listen</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-foreground break-words">
          {title}
        </p>
        {duration ? <p className="mt-0.5 text-xs text-muted">{duration}</p> : null}
      </div>
      <audio
        controls
        preload="metadata"
        src={src}
        className="mt-4 h-10 w-full max-w-full accent-accent"
      >
        <a href={src} className="text-sm text-accent hover:underline">
          Download audio
        </a>
      </audio>
    </div>
  );
}
