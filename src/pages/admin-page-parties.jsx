import { useEffect, useState } from "react";
import { useParties } from "../hooks/use-parties";
import { SpinLoader } from "../components/spin-loader";
import { useAuthContext } from "../context/auth-context.jsx";
import { Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const AdminPartiesTable = () => {
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
  const itemsPerPage = 8;
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const { isAdmin } = useAuthContext();
  const [admin, setAdmin] = useState();

  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const roles = await isAdmin();
      if (
        roles &&
        Array.isArray(roles) &&
        roles.some((role) => role.name === "admin")
      ) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.error("Failed to check admin role:", error);
      setAdmin(false);
    }
  };

  checkAdmin();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser ?? null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsUserLoading(true);
        setTimeout(() => setIsUserLoading(false), 500);
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
      <div className="flex justify-center items-center h-screen">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="px-6 py-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-white">All Parties</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
          placeholder="Search by Party Name"
          className="p-2 border border-gray-300 rounded-md w-full text-white"
        />

        <input
          type="text"
          value={filters.country}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, country: e.target.value }))
          }
          placeholder="Search by Country"
          className="p-2 border border-gray-300 rounded-md w-full text-white"
        />

        <input
          type="text"
          value={filters.organizer}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, organizer: e.target.value }))
          }
          placeholder="Search by Organizer"
          className="p-2 border border-gray-300 rounded-md w-full text-white"
        />

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, startDate: e.target.value }))
          }
          className="p-2 border border-gray-300 rounded-md w-full text-white"
        />

        <button
          onClick={!isEmpty ? applyFilters : null}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition w-full"
        >
          Apply Filter
        </button>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition w-full"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <SpinLoader />
        </div>
      ) : paginatedParties.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Organizer</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParties.map((party) => (
                <tr key={party.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{party.name_party}</td>
                  <td className="px-6 py-4">{party.name_organizer}</td>
                  <td className="px-6 py-4">{party.name_country}</td>
                  <td className="px-6 py-4">{party.date_start}</td>
                  <td className="px-6 py-4">{party.date_end}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {admin ? (
                      <>
                        <button
                          onClick={() => handleDelete(party.id)}
                          className="text-white secondary-button rounded-md cursor-pointer"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        <Link
                          to={`/update-event/${party.id}`}
                          className="text-white secondary-button rounded-md cursor-pointer flex items-center"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </Link>
                        <button
                          onClick={() => navigate(`/parties/${party.id}`)}
                          className="secondary-button text-white rounded-md cursor-pointer"
                        >
                          <i class="fa-solid fa-info"></i>
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    {/* Future: Add Edit Button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No parties found.</p>
      )}

      {/* Pagination */}
      {parties.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={Math.ceil(parties.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{
              "& .MuiPaginationItem-root": {
                backgroundColor: "purple",
                color: "white",
                margin: "0 4px",
              },
              "& .Mui-selected": {
                backgroundColor: "#8a2be2 !important",
                color: "white",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
