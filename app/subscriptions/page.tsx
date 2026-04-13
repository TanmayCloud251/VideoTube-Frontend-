"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSubscribedChannels } from "@/services/subscription.service";
import Link from "next/link";
import { Users, Bell } from "lucide-react";

interface Subscription {
  _id: string;
  channel: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
}

export default function SubscriptionsPage() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscribedChannels(user!._id);
      const data = Array.isArray(res) ? res : res?.data || [];
      // Filter out any entries where the channel might be missing or deleted
      const validSubscriptions = data.filter((sub: any) => sub?.channel);
      setSubscriptions(validSubscriptions);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Login to see your subscriptions</h2>
        <Link href="/login" className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-accent/10 p-2.5 rounded-xl">
          <Users size={22} className="text-brand-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Subscriptions</h1>
          <p className="text-xs text-neutral-500">{subscriptions.length} channels</p>
        </div>
      </div>

      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {subscriptions.map((sub) => (
            <Link 
              key={sub._id} 
              href={`/profile/${sub.channel.username}`}
              className="bg-neutral-800/20 p-4 rounded-2xl border border-neutral-800 hover:bg-neutral-800/40 transition-all group flex flex-col items-center text-center"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 ring-1 ring-neutral-800 group-hover:ring-brand-accent transition-all">
                <img 
                  src={sub.channel.avatar} 
                  alt={sub.channel.fullName} 
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-white text-sm line-clamp-1">{sub.channel.fullName}</h3>
              <p className="text-neutral-500 text-[10px] mb-3">@{sub.channel.username}</p>
              <div className="flex items-center gap-1.5 bg-neutral-800/50 px-3 py-1 rounded-full text-[10px] text-neutral-400">
                <Bell size={12} />
                Subscribed
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-800/20 rounded-3xl border border-dashed border-neutral-700">
          <p className="text-neutral-400 text-lg">You haven't subscribed to any channels yet.</p>
          <Link href="/" className="text-brand-accent mt-4 inline-block hover:underline">
            Explore videos
          </Link>
        </div>
      )}
    </div>
  );
}
