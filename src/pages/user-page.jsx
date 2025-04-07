import { useParams } from "react-router-dom";
import { useUser } from "../hooks/use-users";
import { SpinLoader } from "../components/spin-loader.jsx";
import { Mail } from "lucide-react";
import placeholderImage from "../assets/placeholder.png";
export const UserPageAdmin = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id);

  if (loading) return <SpinLoader />;

  if (!user) {
    return (
      <div className="text-center mt-12 text-red-500">
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-12 bg-bgColor">
      <div className="w-full max-w-lg bg-gray-900 shadow-lg rounded-xl p-6 text-center">
        <div className="mx-auto mb-4">
          <img
            src={user.image_url ? user.image_url : placeholderImage}
            alt={`${user.username}'s profile`}
            className="w-48 h-48 rounded-full object-cover border-4 border-purple-700 mx-auto shadow-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{user.username}</h2>
        <p className="text-white font-medium mb-4">@{user.username}</p>
        <div className="space-y-3 text-left px-4">
          <div className="flex items-center text-gray-700">
            <Mail className="mr-3 text-purple-700" size={20} />
            <span className="truncate text-white">{user.email}</span>
          </div>
          <div className="mt-2 text-gray-500">
            <p>
              <strong>Role:</strong>{" "}
              {user.roles.map((role) => role.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
