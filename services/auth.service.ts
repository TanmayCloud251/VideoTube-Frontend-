import { api } from "./api";

export const loginUser = async (data: any) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data: FormData) => {
  const res = await api.post("/users/register", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/current-user");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

export const getUserChannelProfile = async (username: string) => {
  const res = await api.get(`/users/c/${username}`);
  return res.data;
};

export const updateAccountDetails = async (data: { fullName: string; email: string }) => {
  const res = await api.patch("/users/update-account", data);
  return res.data;
};

export const updateUserAvatar = async (data: FormData) => {
  const res = await api.patch("/users/avatar", data);
  return res.data;
};

export const updateUserCoverImage = async (data: FormData) => {
  const res = await api.patch("/users/cover-image", data);
  return res.data;
};

export const getWatchHistory = async () => {
  const res = await api.get("/users/history");
  return res.data;
};
