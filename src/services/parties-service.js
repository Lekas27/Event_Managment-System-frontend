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

  async deleteParty(partyId) {
    try {
      const response = await backendClient.delete(`party/${partyId}`);
      if (response.status === 204) {
        console.log("Party deleted successfully");
        alert("Party deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting party:", error);
      throw error;
    }
  },
  async updateParty(partyId, data) {
    const payload = {
      name_party: data.name_party,
      url_image_full: data.url_image_full,
      name_organizer: data.name_organizer,
      date_start: new Date(data.date_start).toISOString(),
      date_end: new Date(data.date_end).toISOString(),
      name_town: data.name_town,
      name_country: data.name_country,
      name_type: data.name_type,
      text_entry_fee: parseFloat(data.text_entry_fee) || 0,
      text_more: data.text_more,
      url_organizer: data.url_organizer,
      url_party: data.url_party,
    };

    console.log("Sending payload:", payload); // 🔍 See what you're sending

    try {
      const response = await backendClient.put(`party/${partyId}`, payload);
      console.log("Party updated:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating party:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
