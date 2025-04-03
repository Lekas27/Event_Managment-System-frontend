import { useAuthContext } from "../context/auth-context";
import { useState, useEffect } from "react";
import userImage from "../assets/user_image.jpg";
import { Mail, Calendar, Award } from "lucide-react";
import { SpinLoader } from "../components/spin-loader.jsx";

export const UserPage = () => {
  const { getUser, logout } = useAuthContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGetUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleGetUser();
    return () => {};
  }, []);

  return (
    <div>
      {user ? (
        (console.log(user),
        (
          <>
            <div className="flex items-center justify-center min-h-200 bg-bgColor">
              <div className="w-full max-w-lg bg-gray-900 shadow-lg rounded-xl p-6 text-center">
                <div className="mx-auto mb-4">
                  <img
                    src={user.image ? user.image : userImage}
                    alt={`Name's profile`}
                    className="w-48 h-48 rounded-full object-cover border-4 border-purple-700 mx-auto shadow-md"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {user.firstName}
                </h2>

                <p className="text-white font-medium mb-4">@{user.firstName}</p>

                <div className="space-y-3 text-left px-4">
                  <div className="flex items-center text-gray-700">
                    <Mail className="mr-3 text-purple-700" size={20} />
                    <span className="truncate text-white">{user.email}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Calendar className="mr-3 text-purple-700" size={20} />
                    <span className="text-white">Joined {user.birthDate}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={logout}
                    className="bg-purple-700 text-white px-6 py-2 rounded-2xl hover:bg-purple-900 transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        ))
      ) : error ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
};
