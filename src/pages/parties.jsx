import { useState } from "react";
import { CardComponent } from "../components/card";
import { useParties } from "../hooks/use-parties";
import Pagination from "@mui/material/Pagination";
import { PaginationComponent } from "../components/pagination-component.jsx";
import { FilterInput } from "../components/filter-inputs.jsx";
import { SpinLoader } from "../components/spin-loader.jsx";
import { useTheme } from "../context/theme-context.jsx";

export const PartiesPage = ({ isAdmin = false }) => {
  const {
    filteredParties,
    isLoading,
    setSearchTerm,
    applyFilter,
    searchTerm,
    deleteFilter,
    isFiltered,
    setOrganizerFilter,
    organizerFilter,
    setStartDateFilter,
    startDateFilter,
    setCountryFilter,
    countryFilter,
  } = useParties();

  let { theme } = useTheme();
  if (isAdmin) theme = "dark";

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedParties = filteredParties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div
      className="mx-auto px-4 min-h-screen"
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <div className="flex flex-wrap justify-center py-6 gap-4">
        {/* Search Bar */}
        <FilterInput
          placeholder="Search for a party..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <FilterInput
          placeholder="Search by Country..."
          value={countryFilter}
          onChange={setCountryFilter}
        />
        <FilterInput
          placeholder="Search by Organizer..."
          value={organizerFilter}
          onChange={setOrganizerFilter}
        />
        <FilterInput
          type="date"
          placeholder="Enter date"
          value={startDateFilter}
          onChange={setStartDateFilter}
        />

        <div className="flex gap-4 items-center">
          {isFiltered ? (
            <>
              <button
                className="px-4 py-2 bg-primaryPurple text-white rounded-lg hover:bg-purple-700 transition"
                onClick={applyFilter}
              >
                Apply Filter
              </button>
              <button
                className="px-4 py-2 bg-primaryPurple text-white rounded-lg hover:bg-purple-700 transition"
                onClick={deleteFilter}
              >
                Remove Filter
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-primaryPurple text-white rounded-lg hover:bg-purple-700 transition"
              onClick={applyFilter}
            >
              Apply Filter
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-100">
          <SpinLoader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedParties.length > 0 ? (
              paginatedParties.map((party) => (
                <CardComponent
                  key={party.id}
                  title={party.name_party}
                  organizer={party.name_organizer}
                  image={party.url_image_full}
                  dateStart={party.date_start}
                  dateEnd={party.date_end}
                  id={party.id}
                  country={party.name_country}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <h2 className="text-center text-white col-span-full">
                No parties found.
              </h2>
            )}
          </div>

          {filteredParties.length > itemsPerPage && (
            <div className="flex justify-center text-white">
              <PaginationComponent
                totalLength={filteredParties.length}
                perPage={itemsPerPage}
                handlePageChange={handleChange}
                currentPage={page}
                className={"my-5"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
