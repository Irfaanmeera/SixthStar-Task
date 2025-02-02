// src/api/userAPI.ts
import axiosInstance from "./config";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users"); 
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserStatistics = async ()=>{
  try{
     const response = await axiosInstance.get('/admin/userGroups');
     console.log('stats response:',response.data)
     return response.data;
  }catch(error){
    console.error("Error fetching users:", error);
    throw error;
  }
}
