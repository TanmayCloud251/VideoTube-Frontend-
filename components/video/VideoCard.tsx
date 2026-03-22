import Link from "next/link";

type Props = {
  video: {
    _id: string;
    title: string;
    thumbnail: string;
    views: number;
    channelName?: string;
    owner?: {
      fullName: string;
    };
  };
};

export default function VideoCard({ video }: Props) {
  const channelName = video.channelName || video.owner?.fullName || "Unknown";
  
  return (
    <Link href={`/video/${video._id}`}>
      <div className="cursor-pointer group">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-3">
          <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
            {video.title}
          </h3>

          <p className="text-xs text-neutral-400 mt-1 hover:text-white transition-colors">
            {channelName}
          </p>

          <p className="text-xs text-neutral-500 mt-0.5">
            {video.views} views
          </p>
        </div>
      </div>
    </Link>
  );
}