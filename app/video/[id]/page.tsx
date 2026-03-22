"use client";

import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/video/VideoPlayer";
import VideoInfo from "@/components/video/VideoInfo";
import CommentSection from "@/components/video/CommentSection";
import VideoCard from "@/components/video/VideoCard";
import { getVideoById, getVideos } from "@/services/video.service";
import { Video } from "@/types";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [videoRes, relatedRes] = await Promise.all([
          getVideoById(id),
          getVideos()
        ]);
        
        setVideo(videoRes.data);
        
        // Filter out current video from related
        const videos = Array.isArray(relatedRes) ? relatedRes : relatedRes?.data || [];
        setRelatedVideos(videos.filter((v: Video) => v._id !== id));
      } catch (err: any) {
        console.error("Error fetching video data:", err);
        setError(err.response?.data?.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Video not found</h2>
        <p className="text-neutral-400 mb-6">{error || "The video you are looking for does not exist."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-brand-accent text-brand-dark px-6 py-2 rounded-full font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* MAIN CONTENT: Player + Info + Comments */}
        <div className="flex-1 min-w-0">
          <VideoPlayer videoUrl={video.videoFile} thumbnailUrl={video.thumbnail} />
          <VideoInfo video={video} />
          <CommentSection videoId={video._id} />
        </div>

        {/* SIDEBAR: Related Videos */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
          <h2 className="text-lg font-bold text-white mb-4">Related Videos</h2>
          <div className="flex flex-col gap-4">
            {relatedVideos.length > 0 ? (
              relatedVideos.map((v) => (
                <div key={v._id} className="flex gap-3">
                  <div className="w-40 flex-shrink-0">
                    <VideoCard video={{
                      _id: v._id,
                      title: v.title,
                      thumbnail: v.thumbnail,
                      views: v.views,
                      channelName: v.owner?.fullName || "Unknown"
                    }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-sm">No related videos found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
