import { api } from "./api";

export const getTweets = async () => {
  const res = await api.get("/tweets");
  return res.data;
};

export const createTweet = async (content: string) => {
  const res = await api.post("/tweets", { content });
  return res.data;
};

export const updateTweet = async (tweetId: string, content: string) => {
  const res = await api.patch(`/tweets/${tweetId}`, { content });
  return res.data;
};

export const deleteTweet = async (tweetId: string) => {
  const res = await api.delete(`/tweets/${tweetId}`);
  return res.data;
};

export const toggleTweetLike = async (tweetId: string) => {
  const res = await api.post(`/likes/toggle/t/${tweetId}`);
  return res.data;
};

export const getUserTweets = async (userId: string) => {
  const res = await api.get(`/tweets/user/${userId}`);
  return res.data;
};
