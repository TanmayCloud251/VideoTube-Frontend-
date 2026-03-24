"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "@/services/auth.service";
import { Settings, Upload, Save, User as UserIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Login to view settings</h2>
        <button onClick={() => router.push('/login')} className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </button>
      </div>
    );
  }

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await updateAccountDetails({ fullName, email });
      setMessage({ type: "success", text: "Account details updated successfully!" });
      // In a real app, you might want to refresh the user context here
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update details." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!avatar) return;
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      await updateUserAvatar(formData);
      setMessage({ type: "success", text: "Avatar updated successfully!" });
      setAvatar(null);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update avatar." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCoverImage = async () => {
    if (!coverImage) return;
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      await updateUserCoverImage(formData);
      setMessage({ type: "success", text: "Cover image updated successfully!" });
      setCoverImage(null);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update cover image." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-accent/10 p-3 rounded-xl">
          <Settings size={24} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-neutral-500">Manage your channel profile and account</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl mb-6 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Images Section */}
        <div className="bg-neutral-800/20 p-6 md:p-8 rounded-2xl border border-neutral-800">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-neutral-800 pb-4">Channel Assets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-4">Profile Picture (Avatar)</label>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
                  <img 
                    src={avatar ? URL.createObjectURL(avatar) : user.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-block px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors"
                  >
                    Select New Image
                  </label>
                  {avatar && (
                    <button
                      onClick={handleUpdateAvatar}
                      disabled={loading}
                      className="mt-2 block w-full px-4 py-2 bg-brand-accent text-brand-dark rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      Save Avatar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-4">Cover Image (Banner)</label>
              <div className="space-y-4">
                <div className="relative w-full h-24 rounded-xl overflow-hidden bg-neutral-800">
                  {(coverImage || user.coverImage) ? (
                    <img 
                      src={coverImage ? URL.createObjectURL(coverImage) : user.coverImage} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500 text-sm">No cover image</div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="inline-block px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors"
                  >
                    Select New Cover
                  </label>
                  {coverImage && (
                    <button
                      onClick={handleUpdateCoverImage}
                      disabled={loading}
                      className="mt-2 block w-full px-4 py-2 bg-brand-accent text-brand-dark rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      Save Cover Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <form onSubmit={handleUpdateDetails} className="bg-neutral-800/20 p-6 md:p-8 rounded-2xl border border-neutral-800">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-neutral-800 pb-4">Personal Details</h2>
          
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center gap-2">
                <UserIcon size={16} /> Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading || (fullName === user.fullName && email === user.email)}
                className="flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-bold bg-brand-accent text-brand-dark hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}