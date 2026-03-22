"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, Plus, Share2, MoreVertical } from "lucide-react";
import { Video, Playlist } from "@/types";
import { toggleVideoLike } from "@/services/like.service";
import { getUserPlaylists, addVideoToPlaylist } from "@/services/playlist.service";
import { toggleSubscription } from "@/services/subscription.service";
import { useAuth } from "@/context/AuthContext";

interface VideoInfoProps {
  video: Video;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likesCount || 0);
  const [isSubscribed, setIsSubscribed] = useState(false); // Assuming we'll fetch this
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showPlaylists, setShowPlaylists] = useState(false);

  useEffect(() => {
    if (user?._id) {
      getUserPlaylists(user._id).then((res) => {
        setPlaylists(res.data || []);
      });
      // In a real app, you'd fetch if user is subscribed to video.owner._id
    }
  }, [user]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like videos");
    try {
      await toggleVideoLike(video._id);
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to like video:", error);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return alert("Please login to subscribe");
    try {
      await toggleSubscription(video.owner._id);
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      await addVideoToPlaylist(playlistId, video._id);
      alert("Added to playlist!");
      setShowPlaylists(false);
    } catch (error) {
      console.error("Failed to add to playlist:", error);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-white">{video.title}</h1>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <img
              src={video.owner.avatar}
              alt={video.owner.fullName}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-0.5">Created by</p>
            <p className="font-semibold text-white leading-none">{video.owner.fullName}</p>
            <p className="text-xs text-neutral-500 mt-1">@{video.owner.username}</p>
          </div>
          <button 
            onClick={handleSubscribe}
            className={`ml-4 px-4 py-1.5 rounded-full font-medium transition-colors ${
              isSubscribed 
                ? "bg-neutral-800 text-white hover:bg-neutral-700" 
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full ${
              isLiked ? "text-brand-accent" : "text-white"
            }`}
          >
            <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
            <span>{likesCount}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowPlaylists(!showPlaylists)}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-full text-white transition-colors"
            >
              <Plus size={20} />
              <span>Save</span>
            </button>

            {showPlaylists && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-neutral-800 rounded-xl shadow-xl border border-neutral-700 p-2 z-50">
                <p className="text-sm font-medium p-2 border-b border-neutral-700 mb-2">Save to...</p>
                <div className="max-h-48 overflow-y-auto">
                  {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                      <button
                        key={playlist._id}
                        onClick={() => handleAddToPlaylist(playlist._id)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded-lg transition-colors"
                      >
                        {playlist.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-400 p-2 text-center">No playlists found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white transition-colors">
            <Share2 size={20} />
          </button>
          
          <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="mt-4 bg-neutral-800/50 rounded-xl p-3 text-sm">
        <div className="flex gap-3 font-semibold mb-1">
          <span>{video.views} views</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-neutral-200 whitespace-pre-wrap">{video.description}</p>
      </div>
    </div>
  );
}
