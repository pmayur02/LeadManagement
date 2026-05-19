import axiosInstance from "../api/axios";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users/all-users");

  return response.data;
};

export const updateUser = async (userId: string,payload: any) => {
  const response = await axiosInstance.patch(`/users/update-users/${userId}`,payload);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/delete-user/${userId}`);
  return response.data;
};