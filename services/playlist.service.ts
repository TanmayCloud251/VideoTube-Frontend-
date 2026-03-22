import { api } from "./api";

export const createPlaylist = async (name: string, description: string) => {
  const res = await api.post("/playlist", { name, description });
  return res.data;
};

export const getUserPlaylists = async (userId: string) => {
  const res = await api.get(`/playlist/user/${userId}`);
  return res.data;
};

export const getPlaylistById = async (playlistId: string) => {
  const res = await api.get(`/playlist/${playlistId}`);
  return res.data;
};

export const addVideoToPlaylist = async (playlistId: string, videoId: string) => {
  const res = await api.patch(`/playlist/add/${videoId}/${playlistId}`);
  return res.data;
};

export const removeVideoFromPlaylist = async (playlistId: string, videoId: string) => {
  const res = await api.patch(`/playlist/remove/${videoId}/${playlistId}`);
  return res.data;
};

export const deletePlaylist = async (playlistId: string) => {
  const res = await api.delete(`/playlist/${playlistId}`);
  return res.data;
};

export const updatePlaylist = async (playlistId: string, name: string, description: string) => {
  const res = await api.patch(`/playlist/${playlistId}`, { name, description });
  return res.data;
};
