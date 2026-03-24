"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserVideos, deleteVideo, togglePublishStatus } from "@/services/video.service";
import { Video } from "@/types";
import Link from "next/link";
import { LayoutDashboard, Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      const res = await getUserVideos(user!._id);
      const data = Array.isArray(res) ? res : res?.data || [];
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch dashboard videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video? This action cannot be undone.")) return;
    
    try {
      await deleteVideo(id);
      setVideos(videos.filter(v => v._id !== id));
    } catch (error) {
      console.error("Failed to delete video:", error);
      alert("Failed to delete video");
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await togglePublishStatus(id);
      setVideos(videos.map(v => v._id === id ? { ...v, isPublished: !v.isPublished } : v));
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      alert("Failed to update status");
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
        <h2 className="text-2xl font-bold text-white mb-4">Login to view dashboard</h2>
        <button onClick={() => router.push('/login')} className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-brand-accent/10 p-3 rounded-xl">
            <LayoutDashboard size={24} className="text-brand-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Channel Dashboard</h1>
            <p className="text-sm text-neutral-500">Manage your videos and settings</p>
          </div>
        </div>
        <Link 
          href="/upload"
          className="flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Upload Video
        </Link>
      </div>

      <div className="bg-neutral-800/20 rounded-2xl border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800 text-sm font-semibold text-neutral-400">
                <th className="p-4 pl-6">Video</th>
                <th className="p-4">Visibility</th>
                <th className="p-4">Views</th>
                <th className="p-4">Date</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link href={`/video/${video._id}`} className="font-medium text-white hover:text-brand-accent line-clamp-1">
                            {video.title}
                          </Link>
                          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{video.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleTogglePublish(video._id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          video.isPublished 
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                            : "bg-neutral-700/50 text-neutral-400 hover:bg-neutral-700"
                        }`}
                      >
                        {video.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                        {video.isPublished ? "Published" : "Hidden"}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-neutral-300">{video.views || 0}</td>
                    <td className="p-4 text-sm text-neutral-300">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button 
                        onClick={() => handleDelete(video._id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors inline-block"
                        title="Delete video"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center py-10">
                      <LayoutDashboard size={48} className="text-neutral-700 mb-4" />
                      <p className="text-lg">No videos uploaded yet</p>
                      <Link href="/upload" className="text-brand-accent mt-2 hover:underline">
                        Upload your first video
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}