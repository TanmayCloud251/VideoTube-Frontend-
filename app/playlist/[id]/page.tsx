"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getPlaylistById, removeVideoFromPlaylist, deletePlaylist } from "@/services/playlist.service";
import { Playlist, Video } from "@/types";
import { Play, Trash2, Clock, ListMusic, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlaylistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const { user } = useAuth();
  const router = useRouter();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const res = await getPlaylistById(id);
      setPlaylist(res.data);
    } catch (error) {
      console.error("Failed to fetch playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    if (!confirm("Remove this video from playlist?")) return;
    try {
      await removeVideoFromPlaylist(id, videoId);
      if (playlist) {
        setPlaylist({
          ...playlist,
          videos: (playlist.videos as Video[]).filter(v => v._id !== videoId)
        });
      }
    } catch (error) {
      console.error("Failed to remove video:", error);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;
    try {
      await deletePlaylist(id);
      router.push("/playlist");
    } catch (error) {
      console.error("Failed to delete playlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Playlist not found</h2>
        <Link href="/playlist" className="text-brand-accent mt-4 inline-block hover:underline">
          Back to your playlists
        </Link>
      </div>
    );
  }

  const videos = playlist.videos as Video[];
  const isOwner = user?._id === playlist.owner;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: Playlist Info Card */}
        <div className="lg:w-[380px] flex-shrink-0">
          <div className="sticky top-24 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 p-6 rounded-3xl border border-neutral-800 shadow-xl overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-2xl">
              {videos.length > 0 ? (
                <img src={videos[0].thumbnail} className="w-full h-full object-cover blur-sm opacity-50" alt="" />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                  <ListMusic size={48} className="text-neutral-700" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <ListMusic size={64} className="text-white/20" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{playlist.name}</h1>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              {playlist.description || "No description provided."}
            </p>

            <div className="flex items-center gap-3 text-xs text-neutral-500 mb-8">
              <span>{videos.length} videos</span>
              <span>•</span>
              <span>Updated {new Date(playlist.updatedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-3">
              <button 
                disabled={videos.length === 0}
                className="flex-1 bg-white text-black py-2.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                <Play size={18} fill="currentColor" />
                Play all
              </button>
              {isOwner && (
                <button 
                  onClick={handleDeletePlaylist}
                  className="p-2.5 bg-neutral-800 hover:bg-red-500/20 hover:text-red-500 rounded-full text-neutral-400 transition-all border border-neutral-700"
                  title="Delete Playlist"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Video List */}
        <div className="flex-1 space-y-2">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div 
                key={video._id}
                className="group flex items-center gap-4 p-2 rounded-xl hover:bg-neutral-800/40 transition-colors"
              >
                <span className="w-6 text-center text-xs text-neutral-500 font-medium group-hover:hidden">
                  {index + 1}
                </span>
                <div className="hidden group-hover:flex w-6 justify-center">
                  <Play size={14} className="text-white" fill="currentColor" />
                </div>

                <Link href={`/video/${video._id}`} className="flex flex-1 items-center gap-4">
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800">
                    <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-brand-accent transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-neutral-400">@{video.owner?.username || "unknown"}</p>
                      <span className="text-neutral-600">•</span>
                      <p className="text-xs text-neutral-500">{video.views} views</p>
                    </div>
                  </div>
                </Link>

                {isOwner && (
                  <button 
                    onClick={() => handleRemoveVideo(video._id)}
                    className="p-2 text-neutral-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    title="Remove from playlist"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-neutral-800/10 rounded-3xl border border-dashed border-neutral-800">
              <p className="text-neutral-500 text-sm">This playlist has no videos yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
