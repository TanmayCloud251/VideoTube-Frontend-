import { api } from "./api";

export const toggleVideoLike = async (videoId: string) => {
  const res = await api.post(`/likes/toggle/v/${videoId}`);
  return res.data;
};

export const toggleCommentLike = async (commentId: string) => {
  const res = await api.post(`/likes/toggle/c/${commentId}`);
  return res.data;
};

export const getLikedVideos = async () => {
  const res = await api.get("/likes/videos");
  return res.data;
};
