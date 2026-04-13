"use client";
import { MediaPlayer, MediaProvider, type MediaLoadedMetadataEvent } from '@vidstack/react';
import { useEffect, useState } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onOrientationChange?: (orientation: "landscape" | "portrait") => void;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, onOrientationChange }: VideoPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadedMetadata = (event: MediaLoadedMetadataEvent) => {
    const { videoWidth, videoHeight } = event.detail;
    if (videoWidth && videoHeight) {
      const newOrientation = videoWidth < videoHeight ? "portrait" : "landscape";
      setOrientation(newOrientation);
      if (onOrientationChange) {
        onOrientationChange(newOrientation);
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full aspect-video bg-neutral-900 animate-pulse rounded-xl border border-neutral-800" />
    );
  }

  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-neutral-900 flex items-center justify-center text-neutral-500 rounded-xl border border-neutral-800">
        Video URL not available
      </div>
    );
  }

  return (
    <div className={`relative w-full mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 transition-all duration-300 ${
      orientation === "portrait" 
        ? "max-w-[400px] aspect-[9/16] max-h-[80vh]" 
        : "w-full aspect-video"
    }`}>
      <MediaPlayer 
        src={videoUrl} 
        poster={thumbnailUrl} 
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full"
        playsInline
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
