"use client";

import { useEffect, useState, useRef } from "react";
import { getVideos } from "@/services/video.service";
import { toggleVideoLike } from "@/services/like.service";
import { Video } from "@/types";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ShortsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getVideos();
        const videoData = Array.isArray(res) ? res : res?.data || [];
        // In a real app, you would filter for shorts based on duration or a flag
        setVideos(videoData.slice(0, 10)); 
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-neutral-400">
        <h2 className="text-xl font-bold mb-2">No Shorts Available</h2>
        <p>Check back later for more content.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      <div className="flex flex-col items-center py-4">
        {videos.map((video, index) => (
          <ShortItem key={video._id} video={video} index={index} />
        ))}
      </div>
    </div>
  );
}

function ShortItem({ video, index }: { video: Video, index: number }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likesCount || 0);

  const handleLike = async () => {
    if (!user) return alert("Please login to like videos");
    try {
      await toggleVideoLike(video._id);
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to like short:", error);
    }
  };

  return (
    <div className="w-full max-w-[450px] h-[calc(100vh-100px)] snap-center relative mb-6 rounded-2xl overflow-hidden bg-neutral-900 group">
      {/* Video Player */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
         <MediaPlayer 
           src={video.videoFile} 
           poster={video.thumbnail} 
           autoPlay={index === 0} 
           loop
           playsInline
           className="w-full h-full object-cover"
         >
          <MediaProvider />
         </MediaPlayer>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 p-4 w-[calc(100%-70px)] pointer-events-auto">
        <Link href={`/profile/${video.owner?.username}`} className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700">
            {video.owner?.avatar ? (
              <img src={video.owner.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-brand-accent/50"></div>
            )}
          </div>
          <span className="font-bold text-white text-[15px]">{video.owner?.fullName || "User"}</span>
          <button className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold ml-2">Subscribe</button>
        </Link>
        <p className="text-white text-sm line-clamp-2 mb-1">{video.title}</p>
        <p className="text-neutral-300 text-xs line-clamp-1">{video.description}</p>
      </div>

      {/* Right Side Actions */}
      <div className="absolute bottom-4 right-2 flex flex-col items-center gap-5 pointer-events-auto w-[60px]">
        <button onClick={handleLike} className="flex flex-col items-center group/btn">
          <div className={`p-3 rounded-full bg-neutral-800/60 backdrop-blur-sm group-hover/btn:bg-neutral-800 transition-colors ${isLiked ? 'text-brand-accent' : 'text-white'}`}>
             <ThumbsUp size={24} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <span className="text-white text-xs mt-1 font-medium">{likesCount}</span>
        </button>

        <button className="flex flex-col items-center group/btn">
          <div className="p-3 rounded-full bg-neutral-800/60 backdrop-blur-sm group-hover/btn:bg-neutral-800 transition-colors text-white">
             <MessageCircle size={24} />
          </div>
          <span className="text-white text-xs mt-1 font-medium">Comment</span>
        </button>

        <button className="flex flex-col items-center group/btn">
          <div className="p-3 rounded-full bg-neutral-800/60 backdrop-blur-sm group-hover/btn:bg-neutral-800 transition-colors text-white">
             <Share2 size={24} />
          </div>
          <span className="text-white text-xs mt-1 font-medium">Share</span>
        </button>
        
        <button className="flex flex-col items-center group/btn">
          <div className="p-3 rounded-full bg-neutral-800/60 backdrop-blur-sm group-hover/btn:bg-neutral-800 transition-colors text-white">
             <MoreVertical size={24} />
          </div>
        </button>

        <div className="w-10 h-10 rounded-md overflow-hidden bg-neutral-800 mt-2 border-2 border-neutral-600">
           <img src={video.thumbnail} alt="Audio track" className="w-full h-full object-cover animate-spin-slow" style={{ animationDuration: '8s' }} />
        </div>
      </div>
    </div>
  );
}
