import { apiClient } from "../api/axios-instance";
export const partiesService = {
  async getParties() {
    try {
      const response = await apiClient.get();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPartiesById(id) {
    try {
      const response = await apiClient.get(`${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
