import Link from "next/link";
import { formatViews, formatTimeAgo, formatDuration } from "@/lib/utils";

type Props = {
  video: {
    _id: string;
    title: string;
    thumbnail: string;
    views: number;
    duration?: number;
    channelName?: string;
    createdAt?: string;
    owner?: {
      fullName: string;
    };
  };
};

export default function SidebarVideoCard({ video }: Props) {
  const channelName = video.channelName || video.owner?.fullName || "Unknown";
  
  return (
    <Link href={`/video/${video._id}`} className="group flex gap-3 cursor-pointer">
      <div className="relative w-40 shrink-0 aspect-video overflow-hidden rounded-lg bg-neutral-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {video.duration !== undefined && (
          <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[10px] font-bold text-white tracking-wider">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-white line-clamp-2 leading-tight group-hover:text-brand-accent transition-colors">
          {video.title}
        </h3>

        <p className="text-xs text-neutral-400 mt-1 hover:text-white transition-colors">
          {channelName}
        </p>

        <p className="text-xs text-neutral-500 mt-0.5">
          {formatViews(video.views)} views • {video.createdAt && formatTimeAgo(video.createdAt)}
        </p>
      </div>
    </Link>
  );
}
