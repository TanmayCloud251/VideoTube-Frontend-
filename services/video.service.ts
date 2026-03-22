import { api } from "./api";

export const getVideos = async () => {
  const res = await api.get("/videos");
  return res.data;
};

export const getVideoById = async (id: string) => {
  const res = await api.get(`/videos/${id}`);
  return res.data;
};