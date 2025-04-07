import { useAuthContext } from "../context/auth-context";
import { useState, useEffect } from "react";

import { Mail } from "lucide-react";
import { SpinLoader } from "../components/spin-loader.jsx";

import { CardComponent } from "../components/card.jsx";

import placeholderImage from "../assets/placeholder.png";
import { useParties } from "../hooks/use-parties.js";

export const UserPage = () => {
  const { getUser, logout } = useAuthContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { currentUserParties } = useParties();

  const handleGetUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData || null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    console.log("Delete party with id:", id);
    // implement logic if needed
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return <SpinLoader />;
  }

  return (
    <div>
      <div className="flex items-center justify-center mt-12 bg-bgColor">
        <div className="w-full max-w-lg bg-gray-900 shadow-lg rounded-xl p-6 text-center">
          <div className="mx-auto mb-4">
            <img
              src={user.image_url ? user.image_url : placeholderImage}
              alt={`Name's profile`}
              className="w-48 h-48 rounded-full object-cover border-4 border-purple-700 mx-auto shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {user.username}
          </h2>
          <p className="text-white font-medium mb-4">@{user.username}</p>
          <div className="space-y-3 text-left px-4">
            <div className="flex items-center text-gray-700">
              <Mail className="mr-3 text-purple-700" size={20} />
              <span className="truncate text-white">{user.email}</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={logout}
              className="bg-purple-700 text-white px-6 py-2 rounded-2xl hover:bg-purple-900 transition duration-300 ease-in-out cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-12 ">
        {currentUserParties ? (
          currentUserParties.map((party) => (
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
    </div>
  );
};
