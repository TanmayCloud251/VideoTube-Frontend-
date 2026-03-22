"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserPlaylists } from "@/services/playlist.service";
import { Video, Playlist } from "@/types";
import Link from "next/link";
import { ListMusic, Play, Clock, MoreVertical } from "lucide-react";

export default function PlaylistsPage() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      const res = await getUserPlaylists(user!._id);
      const data = Array.isArray(res) ? res : res?.data || [];
      setPlaylists(data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
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
        <h2 className="text-2xl font-bold text-white mb-4">Login to see your playlists</h2>
        <Link href="/login" className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-accent/10 p-2.5 rounded-xl">
          <ListMusic size={22} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Your Playlists</h1>
          <p className="text-xs text-neutral-500">{playlists.length} playlists</p>
        </div>
      </div>

      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => {
            const videoCount = Array.isArray(playlist.videos) ? playlist.videos.length : 0;
            const firstVideoThumbnail = videoCount > 0 && typeof playlist.videos[0] !== 'string' 
              ? (playlist.videos[0] as Video).thumbnail 
              : null;

            return (
              <Link key={playlist._id} href={`/playlist/${playlist._id}`} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-800 border border-neutral-800 mb-2.5 shadow-md group-hover:shadow-brand-accent/5 transition-all">
                  {firstVideoThumbnail ? (
                    <img 
                      src={firstVideoThumbnail} 
                      alt={playlist.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                      <ListMusic size={40} className="text-neutral-700" />
                    </div>
                  )}
                  
                  {/* Playlist Overlay */}
                  <div className="absolute inset-y-0 right-0 w-1/4 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white border-l border-white/5">
                    <ListMusic size={18} />
                    <span className="text-sm font-bold mt-0.5">{videoCount}</span>
                  </div>

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold scale-90 group-hover:scale-100 transition-transform">
                      <Play size={14} fill="currentColor" />
                      PLAY ALL
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start px-0.5">
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight group-hover:text-brand-accent transition-colors">
                      {playlist.name}
                    </h3>
                    <p className="text-neutral-500 text-[10px] mt-1">
                      View full playlist
                    </p>
                  </div>
                  <button className="text-neutral-500 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-800/20 rounded-3xl border border-dashed border-neutral-700">
          <p className="text-neutral-400 text-lg">No playlists yet.</p>
          <p className="text-neutral-500 text-sm mt-2">Start saving videos to see them here.</p>
        </div>
      )}
    </div>
  );
}
