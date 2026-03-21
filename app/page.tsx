"use client";

import { useEffect, useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import { getVideos } from "@/services/video.service";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video: any) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}