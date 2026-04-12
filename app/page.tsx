"use client";

import { useEffect, useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import VideoCardSkeleton from "@/components/video/VideoCardSkeleton";
import { getVideos } from "@/services/video.service";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getVideos();
        // Handle both direct array and object-wrapped responses
        const videoData = Array.isArray(res) ? res : res?.data || [];
        setVideos(videoData);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1600px] mx-auto w-full px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : !Array.isArray(videos) || videos.length === 0 ? (
          <div className="text-center mt-10 text-neutral-400">No videos found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {videos.map((video: any) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}