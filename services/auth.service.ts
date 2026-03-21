import { api } from "./api";

export const loginUser = async (data: any) => {
  // Common backend expects 'username' or 'email' or 'usernameOrEmail'
  // Since we use 'identifier', we'll pass it as is or map it
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
