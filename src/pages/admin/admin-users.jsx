import { useUsers } from "../../hooks/use-users.js";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../services/users-service.js";
import { SpinLoader } from "../../components/spin-loader.jsx";

export const AdminUsers = () => {
  const { users, loading } = useUsers();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const showDetails = (id) => navigate(`/admin/users/${id}`);
  const banUser = (id) => usersService.banUser(id);

  const paginatedUsers = users.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="px-6 py-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-white">All Users</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <SpinLoader />
        </div>
      ) : paginatedUsers.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => showDetails(user.id)}
                      className="px-3 py-1 text-white secondary-button hover:bg-blue-600 cursor-pointer rounded-md transition "
                    >
                      Show Details
                    </button>
                    <button
                      // onClick={() => banUser(user.id)}
                      className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition"
                    >
                      Ban User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {users.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(users.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
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
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};
