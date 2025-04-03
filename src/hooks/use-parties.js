import { useEffect, useState } from "react";
import { partiesService } from "../services/parties-service";

export const useParties = () => {
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [organizerFilter, setOrganizerFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");

  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const data = await partiesService.getParties();
        setParties(data.partylist);
        setFilteredParties(data.partylist);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParties();
  }, []);

  const applyFilter = () => {
    let filtered = parties;

    if (searchTerm) {
      filtered = filtered.filter((party) =>
        party.nameParty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (organizerFilter) {
      filtered = filtered.filter((party) =>
        party.nameOrganizer
          .toLowerCase()
          .includes(organizerFilter.toLowerCase())
      );
    }
    if (countryFilter) {
      filtered = filtered.filter((party) =>
        party.nameCountry.toLowerCase().includes(countryFilter.toLowerCase())
      );
    }

    if (startDateFilter) {
      const startDate = new Date(startDateFilter);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(
        (party) => new Date(party.dateStart) >= new Date(startDate)
      );
    }

    setFilteredParties(filtered);
    setIsFiltered(true);
  };

  const deleteFilter = () => {
    setIsFiltered(false);
    setFilteredParties(parties);
    setSearchTerm("");
    setOrganizerFilter("");
    setStartDateFilter("");

    setCountryFilter("");
  };

  return {
    filteredParties,
    isLoading,
    setSearchTerm,
    applyFilter,
    searchTerm,
    deleteFilter,
    isFiltered,
    parties,
    organizerFilter,
    setOrganizerFilter,
    startDateFilter,
    setStartDateFilter,

    countryFilter,
    setCountryFilter,
  };
};
