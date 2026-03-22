"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getComments, addComment, deleteComment } from "@/services/comment.service";
import { Comment } from "@/types";
import { Trash2, MessageSquare, ThumbsUp } from "lucide-react";
import { toggleCommentLike } from "@/services/like.service";

interface CommentSectionProps {
  videoId: string;
}

function CommentItem({ 
  comment, 
  user, 
  onDelete 
}: { 
  comment: Comment, 
  user: any, 
  onDelete: (id: string) => void 
}) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const handleLike = async () => {
    if (!user) return alert("Please login to like comments");
    try {
      await toggleCommentLike(comment._id);
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img src={comment.owner.avatar} alt={comment.owner.fullName} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-white">@{comment.owner.username}</span>
          <span className="text-xs text-neutral-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed">{comment.content}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs transition-colors hover:text-white ${
              isLiked ? "text-brand-accent" : "text-neutral-500"
            }`}
          >
            <ThumbsUp size={14} fill={isLiked ? "currentColor" : "none"} />
            <span>{likesCount}</span>
          </button>

          {user?._id === comment.owner._id && (
            <button
              onClick={() => onDelete(comment._id)}
              className="text-neutral-500 hover:text-red-500 transition-colors p-1"
              title="Delete comment"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await getComments(videoId);
      const commentData = Array.isArray(res) ? res : res?.data || [];
      const finalComments = Array.isArray(commentData) ? commentData : commentData.docs || [];
      setComments(finalComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");
    if (!newComment.trim()) return;

    try {
      const res = await addComment(videoId, newComment);
      if (res) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="mt-8 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={22} className="text-neutral-400" />
        <h2 className="text-xl font-bold text-white">{comments.length} Comments</h2>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img src={user.avatar} alt={user.fullName} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-neutral-700 py-2 focus:border-white transition-colors outline-none text-white text-sm"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setNewComment("")}
                className="px-4 py-1.5 text-sm font-medium hover:bg-neutral-800 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="ml-2 px-4 py-1.5 text-sm font-medium bg-brand-accent text-brand-dark rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-neutral-800/30 p-4 rounded-xl mb-8 text-center text-sm text-neutral-400">
          Please login to join the conversation.
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-neutral-500 text-sm">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment._id} 
              comment={comment} 
              user={user} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="text-center text-neutral-500 text-sm py-8">No comments yet. Be the first to comment!</div>
        )}
      </div>
    </div>
  );
}
