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
};
