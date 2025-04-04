import { useState, useEffect } from "react";
import { partiesService } from "../services/parties-service";

export const useParties = () => {
  const [parties, setParties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    organizer: "",
    startDate: "",
    country: "",
  });
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
  }, [isFiltered]); // Sada se podaci refetchuju kada filters bude resetovan

  return {
    parties,
    isLoading,
    filters,
    setFilters,
    applyFilters,
    clearFilters,
    isFiltered,
  };
};
