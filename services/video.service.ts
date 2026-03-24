import { api } from "./api";

export const getVideos = async (params?: any) => {
  const res = await api.get("/videos", { params });
  return res.data;
};

export const getUserVideos = async (userId: string) => {
  const res = await api.get("/videos", { params: { userId } });
  return res.data;
};

export const getVideoById = async (id: string) => {
  const res = await api.get(`/videos/${id}`);
  return res.data;
};

export const publishVideo = async (data: FormData) => {
  const res = await api.post("/videos", data);
  return res.data;
};

export const updateVideo = async (id: string, data: FormData) => {
  const res = await api.patch(`/videos/${id}`, data);
  return res.data;
};

export const deleteVideo = async (id: string) => {
  const res = await api.delete(`/videos/${id}`);
  return res.data;
};

export const togglePublishStatus = async (id: string) => {
  const res = await api.patch(`/videos/toggle/publish/${id}`);
  return res.data;
};