import { backendClient } from "../api/axios-instance";
export const usersService = {
  async getUsers() {
    try {
      const response = await backendClient.get("users");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getUserById(id) {
    try {
      const response = await backendClient.get(`users/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteUserById(id) {
    try {
      console.log("Trying to delete user with ID:", id);
      const response = await backendClient.delete(`/users/${id}`);
      return response.data;
    } catch (err) {
      console.error("error in service:", err);
      throw err;
    }
  },
};
