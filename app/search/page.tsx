"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { searchService } from "@/services/search.service"
import { Video } from "@/types"
import SearchCard from "@/components/video/SearchCard"
import { Loader2, Search as SearchIcon, Users, MessageSquare, ListVideo } from "lucide-react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<{
    videos: Video[];
    users: any[];
    tweets: any[];
    playlists: any[];
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      setLoading(true)
      try {
        const response = await searchService(query)
        setResults(response.data)
        setError(null)
      } catch (err: any) {
        console.error("Search error:", err)
        setError(err.response?.data?.message || "Failed to fetch search results")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (!query) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-neutral-400">
        <SearchIcon size={64} strokeWidth={1.5} />
        <h2 className="text-xl font-medium">Search for videos, users, and more...</h2>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-red-500">
        <p className="text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="rounded-full bg-brand-accent px-6 py-2 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    )
  }

  const hasResults = results && (
    results.videos.length > 0 || 
    results.users.length > 0 || 
    results.tweets.length > 0 || 
    results.playlists.length > 0
  )

  if (!hasResults) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-neutral-400">
        <h2 className="text-xl font-medium">No results found for "{query}"</h2>
        <p>Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-xl font-bold">
        Search results for "<span className="text-brand-accent">{query}</span>"
      </h1>

      {/* Videos Section */}
      {results!.videos.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
            <SearchIcon size={20} className="text-neutral-400" />
            <h2 className="text-lg font-bold">Videos</h2>
          </div>
          <div className="flex flex-col">
            {results!.videos.map((video) => (
              <SearchCard key={video._id} video={video} />
            ))}
          </div>
        </section>
      )}

      {/* Users Section (YouTube often shows a user card at the top) */}
      {results!.users.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Users size={20} className="text-neutral-400" />
            <h2 className="text-lg font-bold">Channels</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results!.users.map((user) => (
              <div key={user._id} className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-800 transition-colors cursor-pointer">
                <img src={user.avatar} alt={user.username} className="h-12 w-12 rounded-full object-cover" />
                <div className="overflow-hidden">
                  <h3 className="font-bold truncate">{user.fullName}</h3>
                  <p className="text-sm text-neutral-400 truncate">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Playlists Section */}
      {results!.playlists.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ListVideo size={20} className="text-neutral-400" />
            <h2 className="text-lg font-bold">Playlists</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results!.playlists.map((playlist) => (
              <div key={playlist._id} className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-800 transition-colors cursor-pointer">
                <h3 className="font-bold mb-1 truncate group-hover:text-brand-accent">{playlist.name}</h3>
                <p className="text-xs text-neutral-400 mb-2">{playlist.videos?.length || 0} videos</p>
                <div className="flex items-center gap-2">
                   <img src={playlist.owner?.avatar} className="w-4 h-4 rounded-full" />
                   <span className="text-xs text-neutral-500">@{playlist.owner?.username}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tweets Section */}
      {results!.tweets.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MessageSquare size={20} className="text-neutral-400" />
            <h2 className="text-lg font-bold">Tweets</h2>
          </div>
          <div className="flex flex-col gap-4">
            {results!.tweets.map((tweet) => (
              <div key={tweet._id} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <img src={tweet.owner?.avatar} className="w-5 h-5 rounded-full" />
                  <span className="text-xs font-bold">@{tweet.owner?.username}</span>
                </div>
                <p className="text-sm text-neutral-300 line-clamp-3">{tweet.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}
