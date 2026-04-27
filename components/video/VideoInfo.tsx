"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, Plus, Share2, MoreVertical, Copy, Facebook, Instagram, MessageCircle, Download, Flag, Clock } from "lucide-react";
import { Video, Playlist } from "@/types";
import { toggleVideoLike } from "@/services/like.service";
import { getUserPlaylists, addVideoToPlaylist, createPlaylist } from "@/services/playlist.service";
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
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

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

  const handleWatchLater = async () => {
    if (!user) return alert("Please login to save videos");
    let watchLaterPlaylist = playlists.find(p => p.name === "Watch Later");
    if (!watchLaterPlaylist) {
      try {
        const res = await createPlaylist("Watch Later", "My watch later videos");
        watchLaterPlaylist = res.data;
        setPlaylists(prev => [...prev, watchLaterPlaylist]);
      } catch (error) {
        console.error("Failed to create Watch Later playlist:", error);
        return;
      }
    }
    handleAddToPlaylist(watchLaterPlaylist._id);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const res = await createPlaylist(newPlaylistName, "My custom playlist");
      setPlaylists([...playlists, res.data]);
      await handleAddToPlaylist(res.data._id);
      setNewPlaylistName("");
      setIsCreating(false);
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShare(false);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShare(false);
  };

  const shareToInstagram = () => {
    alert("Instagram doesn't support direct web sharing. Link copied instead!");
    navigator.clipboard.writeText(shareUrl);
    setShowShare(false);
  };

  const handleDownload = () => {
    const downloadUrl = video.videoFile.replace('/upload/', '/upload/fl_attachment/');
    window.open(downloadUrl, '_blank');
    setShowMore(false);
  };

  const handleReport = () => {
    alert("Thank you for reporting. Our team will review this video.");
    setShowMore(false);
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-white">{video.title}</h1>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-700">
            {video.owner?.avatar ? (
              <img
                src={video.owner.avatar}
                alt={video.owner.fullName || "User"}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                ?
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-0.5">Created by</p>
            <p className="font-semibold text-white leading-none">{video.owner?.fullName || "Unknown User"}</p>
            <p className="text-xs text-neutral-500 mt-1">@{video.owner?.username || "unknown"}</p>
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
              onClick={() => {
                setShowPlaylists(!showPlaylists);
                setShowShare(false);
                setShowMore(false);
              }}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-full text-white transition-colors"
            >
              <Plus size={20} />
              <span>Save</span>
            </button>

            {showPlaylists && (
              <div className="absolute right-0 bottom-full mb-2 w-64 bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 p-2 z-50">
                <p className="text-sm font-medium p-2 border-b border-neutral-700 mb-2">Save to...</p>
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={handleWatchLater}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <Clock size={18} />
                    Watch Later
                  </button>
                  <div className="h-px bg-neutral-700 my-1" />
                  {playlists.filter(p => p.name !== "Watch Later").map((playlist) => (
                    <button
                      key={playlist._id}
                      onClick={() => handleAddToPlaylist(playlist._id)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      {playlist.name}
                    </button>
                  ))}
                  
                  <div className="h-px bg-neutral-700 my-1" />
                  
                  {isCreating ? (
                    <div className="p-2 space-y-2">
                      <input
                        type="text"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        placeholder="Enter playlist name..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-accent"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleCreatePlaylist}
                          className="flex-1 bg-white text-black text-xs font-bold py-1 rounded hover:bg-neutral-200"
                        >
                          Create
                        </button>
                        <button
                          onClick={() => setIsCreating(false)}
                          className="flex-1 bg-neutral-800 text-white text-xs py-1 rounded hover:bg-neutral-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsCreating(true)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors text-brand-accent"
                    >
                      <Plus size={18} />
                      Create New Playlist
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => {
                setShowShare(!showShare);
                setShowPlaylists(false);
                setShowMore(false);
              }}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white transition-colors"
            >
              <Share2 size={20} />
            </button>

            {showShare && (
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 p-2 z-50">
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Copy size={18} />
                  Copy Link
                </button>
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
                <button
                  onClick={shareToFacebook}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Facebook size={18} />
                  Facebook
                </button>
                <button
                  onClick={shareToInstagram}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Instagram size={18} />
                  Instagram
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => {
                setShowMore(!showMore);
                setShowPlaylists(false);
                setShowShare(false);
              }}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            {showMore && (
              <div className="absolute right-0 bottom-full mb-2 w-40 bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 p-2 z-50">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={handleReport}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-colors text-red-500"
                >
                  <Flag size={18} />
                  Report
                </button>
              </div>
            )}
          </div>
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
