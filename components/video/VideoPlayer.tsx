"use client";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-neutral-800/50">
      <MediaPlayer src={videoUrl} poster={thumbnailUrl} controls className="w-full h-full">
        <MediaProvider />
      </MediaPlayer>
    </div>
  );
}
