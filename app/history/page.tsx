"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWatchHistory } from "@/services/auth.service";
import VideoCard from "@/components/video/VideoCard";
import { Video } from "@/types";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await getWatchHistory();
      const data = Array.isArray(res) ? res : res?.data || [];
      // The backend populate might return a different structure. Usually it returns the populated video objects in the watchHistory array
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch watch history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Login to view watch history</h2>
        <button onClick={() => router.push('/login')} className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-accent/10 p-2.5 rounded-xl">
          <History size={22} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Watch History</h1>
          <p className="text-xs text-neutral-500">Videos you've watched</p>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...history].reverse().map((video) => (
            <VideoCard key={video._id} video={{
                _id: video._id,
                title: video.title,
                thumbnail: video.thumbnail,
                views: video.views,
                duration: video.duration,
                createdAt: video.createdAt,
                owner: video.owner
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-800/20 rounded-3xl border border-dashed border-neutral-700">
          <p className="text-neutral-400 text-lg">Your watch history is empty.</p>
        </div>
      )}
    </div>
  );
}