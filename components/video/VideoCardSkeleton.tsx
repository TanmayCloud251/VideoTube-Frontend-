import { Skeleton } from "@/components/ui/Skeleton"

export default function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
          <div className="flex flex-col gap-1 mt-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
