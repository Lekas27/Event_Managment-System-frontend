import { backendClient } from "../api/axios-instance";
export const partiesService = {
  async getParties() {
    try {
      const response = await backendClient.get("party");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPartiesById(id) {
    try {
      const response = await backendClient.get(`party/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
