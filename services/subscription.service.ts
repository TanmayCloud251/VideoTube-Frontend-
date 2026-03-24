import { api } from "./api";

export const toggleSubscription = async (channelId: string) => {
  const res = await api.post(`/subscriptions/c/${channelId}`);
  return res.data;
};

export const getSubscribedChannels = async (subscriberId: string) => {
  const res = await api.get(`/subscriptions/u/${subscriberId}`);
  return res.data;
};

export const getUserChannelSubscribers = async (channelId: string) => {
  const res = await api.get(`/subscriptions/c/${channelId}`);
  return res.data;
};
