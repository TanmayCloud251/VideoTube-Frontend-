"use client";

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
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="100%"
        playing={false} // Disable autoplay to prevent "interrupted" error
        light={thumbnailUrl || true} // Shows thumbnail/placeholder, loads player on click
        playIcon={
          <div className="w-20 h-20 rounded-full bg-brand-accent/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-brand-dark border-b-[15px] border-b-transparent ml-2"></div>
          </div>
        }
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
              playsInline: true,
              style: { width: '100%', height: '100%', objectFit: 'contain' }
            },
          },
        }}
      />
    </div>
  );
}
