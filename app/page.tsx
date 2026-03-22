"use client";

import { useEffect, useState } from "react";
import VideoCard from "@/components/video/VideoCard";
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

  if (loading) return <div>Loading videos...</div>;

  if (!Array.isArray(videos) || videos.length === 0) {
    return <div className="text-center mt-10 text-neutral-400">No videos found.</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}