import { api } from "./api";

export const getComments = async (videoId: string) => {
  const res = await api.get(`/comments/${videoId}`);
  return res.data;
};

export const addComment = async (videoId: string, content: string) => {
  const res = await api.post(`/comments/${videoId}`, { content });
  return res.data;
};

export const deleteComment = async (commentId: string) => {
  const res = await api.delete(`/comments/c/${commentId}`);
  return res.data;
};

export const updateComment = async (commentId: string, content: string) => {
  const res = await api.patch(`/comments/c/${commentId}`, { content });
  return res.data;
};
