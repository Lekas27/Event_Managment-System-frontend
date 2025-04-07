import { useState, useEffect } from "react";
import { useParties } from "../hooks/use-parties";
import Pagination from "@mui/material/Pagination";
import { CardComponent } from "../components/card";
import { SpinLoader } from "../components/spin-loader";
import { FilterInput } from "../components/filter-inputs.jsx";
import { useAuthContext } from "../context/auth-context.jsx";

export const PartiesPage = () => {
  const { getUser } = useAuthContext();
  const {
    parties,
    isLoading,
    filters,
    setFilters,
    applyFilters,
    clearFilters,
    isFiltered,
    isEmpty,
    handleDelete,
  } = useParties();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const itemsPerPage = 6;
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser ?? null);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsUserLoading(true);
        setTimeout(() => {
          setIsUserLoading(false);
        }, 500);
      }
    };

    fetchUser();
  }, [getUser]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedParties =
    parties?.slice((page - 1) * itemsPerPage, page * itemsPerPage) || [];

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-6 min-h-screen">
      {/* Filter Inputs */}
      <div className="flex flex-wrap justify-center py-4 gap-6">
        <div className="flex gap-4 items-center">
          <FilterInput
            type="text"
            value={filters.searchTerm}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, searchTerm: value }))
            }
            placeholder="Search by Party Name"
            className="p-2 border border-gray-300 rounded-md"
          />

          <FilterInput
            type="text"
            value={filters.country}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, country: value }))
            }
            placeholder="Search by Country"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex gap-4 items-center">
          <FilterInput
            type="text"
            value={filters.organizer}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, organizer: value }))
            }
            placeholder="Search by Organizer"
            className="p-2 border border-gray-300 rounded-md"
          />

          <FilterInput
            type="date"
            value={filters.startDate}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, startDate: value }))
            }
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={!isEmpty ? applyFilters : ""}
            className="px-4 mx-auto py-2 primary-button text-white rounded-lg hover:bg-opacity-80 transition cursor-pointer"
          >
            Apply Filter
          </button>
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="px-4 mx-auto py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-80 transition cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh] z-100">
          <SpinLoader />
        </div>
      ) : (
        <>
          {/* Displaying the Party Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedParties.length > 0 ? (
              paginatedParties.map((party) => (
                <div key={party.id} className="relative">
                  <CardComponent
                    title={party.name_party}
                    organizer={party.name_organizer}
                    image={party.url_image_full}
                    dateStart={party.date_start}
                    dateEnd={party.date_end}
                    id={party.id}
                    country={party.name_country}
                    user={user?.id}
                    isCurrentUser={party.user_id}
                    onDelete={() => handleDelete(party.id)}
                  />
                </div>
              ))
            ) : (
              <h2 className="text-center text-gray-500 col-span-full">
                No parties found.
              </h2>
            )}
          </div>

          {/* Pagination */}
          {parties.length > itemsPerPage && (
            <div className="flex justify-center mt-5">
              <Pagination
                count={Math.ceil(parties.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "purple",
                    marginTop: "15px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#6a0dad",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#8a2be2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#8a2be2",
                    },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
