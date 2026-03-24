"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTweets, createTweet, updateTweet, toggleTweetLike, deleteTweet } from "@/services/tweet.service";
import { ThumbsUp, Trash2, Send, MessageCircle, Edit2, X, Check } from "lucide-react";

interface Tweet {
  _id: string;
  content: string;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  createdAt: string;
  likesCount?: number;
  isLiked?: boolean;
}

export default function TweetsPage() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const res = await getTweets();
      const tweetData = Array.isArray(res) ? res : res?.data || [];
      setTweets(Array.isArray(tweetData) ? tweetData : tweetData.docs || []);
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to tweet");
    if (!content.trim()) return;

    try {
      await createTweet(content);
      setContent("");
      fetchTweets();
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  const handleLike = async (id: string) => {
    if (!user) return alert("Please login to like tweets");
    try {
      await toggleTweetLike(id);
      setTweets(prev => prev.map(t => {
        if (t._id === id) {
          const isLiked = !t.isLiked;
          return {
            ...t,
            isLiked,
            likesCount: (t.likesCount || 0) + (isLiked ? 1 : -1)
          };
        }
        return t;
      }));
    } catch (error) {
      console.error("Failed to like tweet:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tweet?")) return;
    try {
      await deleteTweet(id);
      setTweets(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  };

  const startEditing = (tweet: Tweet) => {
    setEditingTweetId(tweet._id);
    setEditContent(tweet.content);
  };

  const cancelEditing = () => {
    setEditingTweetId(null);
    setEditContent("");
  };

  const handleEdit = async (id: string) => {
    if (!editContent.trim()) return;
    try {
      await updateTweet(id, editContent);
      setTweets(prev => prev.map(t => t._id === id ? { ...t, content: editContent } : t));
      setEditingTweetId(null);
    } catch (error) {
      console.error("Failed to update tweet:", error);
      alert("Failed to update tweet");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-accent/10 p-2.5 rounded-xl">
          <MessageCircle size={22} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Tweets</h1>
          <p className="text-xs text-neutral-500">Share your thoughts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Create Tweet */}
        <div className="lg:col-span-4">
          {user ? (
            <div className="sticky top-24">
              <form onSubmit={handleCreate} className="bg-neutral-800/20 p-5 rounded-xl border border-neutral-800">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-neutral-600 resize-none h-32 text-base outline-none"
                />
                <div className="flex justify-between items-center mt-3 border-t border-neutral-800 pt-3">
                  <div className="text-neutral-600 text-xs">
                    {content.length}/280
                  </div>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className="bg-brand-accent text-brand-dark px-5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Send size={16} />
                    Tweet
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-neutral-800/20 p-6 rounded-xl border border-neutral-800 text-center">
              <p className="text-neutral-400 text-sm">Login to share your thoughts.</p>
            </div>
          )}
        </div>

        {/* Right Column: Tweet Feed */}
        <div className="lg:col-span-8 space-y-3">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div key={tweet._id} className="bg-neutral-800/20 p-5 rounded-xl border border-neutral-800 hover:bg-neutral-800/40 transition-colors">
                <div className="flex gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={tweet.owner.avatar} alt={tweet.owner.fullName} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{tweet.owner.fullName}</span>
                        <span className="text-neutral-500 text-xs">@{tweet.owner.username}</span>
                        <span className="text-neutral-600 text-[10px]">• {new Date(tweet.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {editingTweetId === tweet._id ? (
                      <div className="mt-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white focus:border-brand-accent outline-none resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={cancelEditing}
                            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(tweet._id)}
                            className="p-1.5 text-brand-accent hover:bg-brand-accent/10 rounded-md transition-colors"
                          >
                            <Check size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-neutral-300 mt-1.5 text-sm leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
                    )}

                    {!editingTweetId && (
                      <div className="flex items-center gap-5 mt-3">
                        <button
                          onClick={() => handleLike(tweet._id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${
                            tweet.isLiked ? "text-brand-accent" : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <ThumbsUp size={16} fill={tweet.isLiked ? "currentColor" : "none"} />
                          <span>{tweet.likesCount || 0}</span>
                        </button>
                        {user?._id === tweet.owner._id && (
                          <>
                            <button
                              onClick={() => startEditing(tweet)}
                              className="text-neutral-600 hover:text-white transition-colors"
                              title="Edit tweet"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(tweet._id)}
                              className="text-neutral-600 hover:text-red-500 transition-colors"
                              title="Delete tweet"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-neutral-800/10 rounded-2xl border border-dashed border-neutral-800">
              <p className="text-neutral-500 text-sm">No tweets yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
