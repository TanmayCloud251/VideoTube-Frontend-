

function VideoCard() {
  return (
    <div className="flex flex-col">
        <div className="h-68">
            Video
        </div>
        <div className="h-30">
            <p>Title</p>
            <div className="flex justify-between">
                <div>Views</div>
                <div>Likes</div>
            </div>
        </div>
    </div>
  )
}

export default VideoCard
