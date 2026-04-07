"use client";

import React, { useEffect, useState } from "react";
import { getUserChannelProfile } from "@/services/auth.service";
import { getUserVideos } from "@/services/video.service";
import { toggleSubscription } from "@/services/subscription.service";
import { useAuth } from "@/context/AuthContext";
import VideoCard from "@/components/video/VideoCard";
import { Video } from "@/types";
import { Bell } from "lucide-react";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = React.use(params);
  const username = resolvedParams.username;
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await getUserChannelProfile(username);
        const channelData = res.data;
        setProfile(channelData);

        // Fetch videos for this user
        if (channelData?._id) {
          const videoRes = await getUserVideos(channelData._id);
          const videoData = Array.isArray(videoRes) ? videoRes : videoRes?.data || [];
          setVideos(videoData.filter((v: Video) => v.isPublished !== false)); // only show published
        }
      } catch (err: any) {
        console.error("Failed to fetch profile:", err);
        setError(err.response?.data?.message || "Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleSubscribe = async () => {
    if (!user) return alert("Please login to subscribe");
    if (!profile) return;
    
    try {
      await toggleSubscription(profile._id);
      setProfile({
        ...profile,
        isSubscribed: !profile.isSubscribed,
        subscribersCount: profile.subscribersCount + (profile.isSubscribed ? -1 : 1)
      });
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Channel not found</h2>
        <p className="text-neutral-400">{error || "The user you are looking for does not exist."}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-64 lg:h-80 bg-neutral-800 relative">
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-neutral-800 to-neutral-900"></div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Channel Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center py-6 border-b border-neutral-800">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-black -mt-16 md:-mt-20 bg-neutral-800 flex-shrink-0">
            <img src={profile.avatar} alt={profile.fullName} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{profile.fullName}</h1>
            <div className="flex items-center gap-4 text-neutral-400 text-sm mt-1 mb-3">
              <span>@{profile.username}</span>
              <span>•</span>
              <span>{profile.subscribersCount} subscribers</span>
              <span>•</span>
              <span>{profile.channelsSubscribedToCount} subscribed</span>
            </div>
          </div>

          {user?._id !== profile._id && (
            <button 
              onClick={handleSubscribe}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-colors ${
                profile.isSubscribed 
                  ? "bg-neutral-800 text-white hover:bg-neutral-700" 
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {profile.isSubscribed ? <><Bell size={18} /> Subscribed</> : "Subscribe"}
            </button>
          )}
        </div>

        {/* Videos Grid */}
        <div className="py-8">
          <h2 className="text-xl font-bold text-white mb-6">Videos</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video._id} video={{
                  _id: video._id,
                  title: video.title,
                  thumbnail: video.thumbnail,
                  views: video.views,
                  duration: video.duration,
                  createdAt: video.createdAt,
                  owner: { fullName: profile.fullName }
                }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-neutral-800/20 rounded-3xl border border-dashed border-neutral-700">
              <p className="text-neutral-400 text-lg">This channel hasn't published any videos yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}