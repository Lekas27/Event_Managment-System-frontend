import { backendClient } from "../api/axios-instance";
export const partiesService = {
  async getParties(query = "") {
    try {
      const response = await backendClient.get(`party/?${query}`);
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
  async createParty(partyData) {
    try {
      const response = await backendClient.post("party/", partyData);
      console.log("Created party:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating party:", error);
      throw error;
    }
  },
};
