"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { publishVideo } from "@/services/video.service";
import { Upload, X } from "lucide-react";

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Login to upload videos</h2>
        <button onClick={() => router.push('/login')} className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoFile || !thumbnail) {
      setError("Please fill in all fields and select both files.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      await publishVideo(formData);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.message || "Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-accent/10 p-3 rounded-xl">
          <Upload size={24} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Upload Video</h1>
          <p className="text-sm text-neutral-500">Share your content with the world</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-800/20 p-6 md:p-8 rounded-2xl border border-neutral-800">
        
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="Enter a catchy title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors resize-none"
            placeholder="Tell viewers about your video"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video File Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Video File</label>
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-700 rounded-xl hover:border-brand-accent hover:bg-brand-accent/5 transition-all cursor-pointer"
              >
                {videoFile ? (
                  <div className="text-center p-4">
                    <p className="text-brand-accent font-medium text-sm line-clamp-1">{videoFile.name}</p>
                    <p className="text-neutral-500 text-xs mt-1">Click to change</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-neutral-500 mb-2" />
                    <span className="text-sm text-neutral-400">Select video file</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Thumbnail Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Thumbnail</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-700 rounded-xl hover:border-brand-accent hover:bg-brand-accent/5 transition-all cursor-pointer overflow-hidden"
              >
                {thumbnail ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(thumbnail)} 
                      alt="Thumbnail preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-neutral-500 mb-2" />
                    <span className="text-sm text-neutral-400">Select thumbnail</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-full text-sm font-bold bg-brand-accent text-brand-dark hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              "Upload Video"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}