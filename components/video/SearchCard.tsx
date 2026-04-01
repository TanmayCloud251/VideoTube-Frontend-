import Link from "next/link";
import { Video } from "@/types";

// Helper for duration
const formatDuration = (seconds: number) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Helper for views
const formatViews = (views: number) => {
  if (!views) return "0 views";
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
};

// Simple relative time (approximate)
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  if (diffInMonths > 0) return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInMinutes > 0) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  return "just now";
};

export default function SearchCard({ video }: { video: Video }) {
  return (
    <Link href={`/video/${video._id}`}>
      <div className="flex flex-col md:flex-row gap-4 group cursor-pointer mb-6 border-b border-neutral-800 pb-6 last:border-0 hover:bg-neutral-900/40 p-2 rounded-xl transition-all">
        {/* Thumbnail */}
        <div className="relative w-full md:w-[360px] aspect-video shrink-0 overflow-hidden rounded-xl bg-neutral-800">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800 animate-pulse" />
          )}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-bold shadow-lg">
            {formatDuration(video.duration)}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-1">
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-brand-accent transition-colors">
            {video.title}
          </h3>
          
          <div className="flex flex-wrap items-center text-xs text-neutral-400 gap-1.5 mt-1.5 font-medium">
             <span>{formatViews(video.views)}</span>
             <span>•</span>
             <span>{video.likesCount || 0} likes</span>
             <span>•</span>
             <span>{formatTimeAgo(video.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 mb-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-700">
              {video.owner?.avatar ? (
                <img 
                  src={video.owner.avatar} 
                  alt={video.owner.username} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-600" />
              )}
            </div>
            <span className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
              {video.owner?.fullName || "Anonymous"}
            </span>
          </div>

          <p className="text-sm text-neutral-400 line-clamp-1 md:line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
