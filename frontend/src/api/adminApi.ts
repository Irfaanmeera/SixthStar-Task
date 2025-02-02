import axiosInstance from "./config";

export const addUser = async (user: {
  name: string;
  email: string;
  password: string;
  group: string;
}) => {
  try {
    const response = await axiosInstance.post("/admin/createUser", user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in adding user:", error);
    throw error;
  }
};
export const updateUser = async (user: {
  _id: string;
  name: string;
  email: string;
  group: string;
}) => {
  try {
    const response = await axiosInstance.put(
      `/admin/updateUser/${user._id}`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserStatistics = async () => {
  try {
    const response = await axiosInstance.get("/admin/userGroups");
    console.log("stats response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const deleteUser = async (id: string) => {
  try {
    await axiosInstance.delete(`/admin/deleteUser/${id}`);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
