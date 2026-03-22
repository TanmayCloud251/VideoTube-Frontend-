"use client";

import { useEffect, useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import { getLikedVideos } from "@/services/like.service";
import { Video } from "@/types";
import { ThumbsUp } from "lucide-react";

export default function LikedVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await getLikedVideos();
        // The liked videos usually come as an array of objects where the video itself is a nested property
        const data = Array.isArray(res) ? res : res?.data || [];
        // Extract video objects if they are nested (common in toggle-like implementations)
        const extractedVideos = data.map((item: any) => item.likedVideo || item.video || item);
        setVideos(extractedVideos.filter((v: any) => v && v._id));
      } catch (error) {
        console.error("Failed to fetch liked videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-accent/10 p-2.5 rounded-xl">
          <ThumbsUp size={22} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Liked Videos</h1>
          <p className="text-xs text-neutral-500">{videos.length} videos</p>
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={{
                _id: video._id,
                title: video.title,
                thumbnail: video.thumbnail,
                views: video.views,
                owner: video.owner
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-800/20 rounded-3xl border border-dashed border-neutral-700">
          <p className="text-neutral-400 text-lg">You haven't liked any videos yet.</p>
        </div>
      )}
    </div>
  );
}
