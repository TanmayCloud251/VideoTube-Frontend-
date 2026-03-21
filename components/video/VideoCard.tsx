import Link from "next/link";

type Props = {
  video: {
    _id: string;
    title: string;
    thumbnail: string;
    views: number;
    channelName: string;
  };
};

export default function VideoCard({ video }: Props) {
  return (
    <Link href={`/video/${video._id}`}>
      <div className="cursor-pointer">
        <img
          src={video.thumbnail}
          className="w-full rounded-lg"
        />

        <div className="mt-2">
          <h3 className="font-semibold text-sm">
            {video.title}
          </h3>

          <p className="text-xs text-gray-400">
            {video.channelName}
          </p>

          <p className="text-xs text-gray-400">
            {video.views} views
          </p>
        </div>
      </div>
    </Link>
  );
}