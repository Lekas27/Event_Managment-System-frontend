import { useState, useEffect } from "react";
import { partiesService } from "../services/parties-service";
import { useNavigate } from "react-router-dom";

export const useParties = () => {
  const [parties, setParties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserParties, setCurrentUserParties] = useState();
  const [filters, setFilters] = useState({
    searchTerm: "",
    organizer: "",
    startDate: "",
    country: "",
  });
  const navigate = useNavigate();

  const isEmpty = Object.values(filters).every(
    (value) => value === "" || value == null
  );
  const [isFiltered, setIsFiltered] = useState(false);

  const buildQuery = () => {
    const query = [];

    if (filters.searchTerm) query.push(`name_party=${filters.searchTerm}`);
    if (filters.organizer) query.push(`name_organizer=${filters.organizer}`);
    if (filters.startDate) query.push(`start_date=${filters.startDate}`);
    if (filters.country) query.push(`name_country=${filters.country}`);

    return query.length ? query.join("&") : "";
  };

  const fetchParties = async () => {
    setIsLoading(true);
    try {
      const query = buildQuery();
      const data = await partiesService.getParties(query);
      setParties(data);
    } catch (err) {
      console.error("Error fetching parties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    setIsFiltered(true);
    fetchParties();
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      organizer: "",
      startDate: "",
      country: "",
    });
    setIsFiltered(false);
  };

  useEffect(() => {
    fetchParties();
  }, [isFiltered]);

  const CreateEvent = async (data) => {
    const payload = {
      name_party: data.nameParty,
      url_image_full: data.urlImageFull,
      date_start: data.dateStart,
      date_end: data.dateEnd,
      name_town: data.nameTown,
      name_country: data.nameCountry,
      name_type: data.nameType,
      text_entry_fee: parseFloat(data.textEntryFee) || 0,
      text_more: data.textMore,
      url_party: data.urlParty,
    };

    try {
      await partiesService.createParty(payload);
      setTimeout;
      navigate("/");
    } catch (error) {
      alert("Failed to create party. Check console for details.", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await partiesService.deleteParty(id);
      navigate("/");
    } catch (error) {
      alert("Failed to delete party.", error);
    }
  };
  const updateParty = async (partyId, data) => {
    try {
      await partiesService.updateParty(partyId, data);
      navigate("/");
      fetchParties();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  const loadCurrentUserParties = async () => {
    try {
      const data = await partiesService.getCurrentUserParties();
      console.log(data);
      setCurrentUserParties(data);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    parties,
    isLoading,
    filters,
    setFilters,
    applyFilters,
    clearFilters,
    isFiltered,
    isEmpty,
    CreateEvent,
    handleDelete,
    updateParty,
    currentUserParties,
  };
};
