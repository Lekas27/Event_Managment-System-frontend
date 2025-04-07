import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import { useTheme } from "../context/theme-context";
import { useAuthContext } from "../context/auth-context";
import { useEffect, useState } from "react";
export const NewsFeed = ({ parties }) => {
  const { getUser } = useAuthContext();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchUser = async () => setCurrentUser(await getUser());
    fetchUser();
  }, [getUser]);
  const { theme } = useTheme();
  const latestParties = [...parties]
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    .slice(0, 2);

  return (
    <div className="w-full lg:w-1/4">
      <h2 className="text-2xl font-bold mb-6">Latest Events</h2>
      {latestParties.length > 0 ? (
        <div className="space-y-4 relative">
          {latestParties.map((party) => (
            <>
              {currentUser && party.user_id === currentUser.id ? (
                <strong className="absolute top-0 right-0 text-xs font-semibold text-white bg-gray-800 px-3 py-1 rounded-full shadow-sm opacity-90 z-1000">
                  Author
                </strong>
              ) : (
                ""
              )}
              <Link to={`/parties/${party.id}`} key={party.id}>
                <div
                  className="rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition duration-300 mb-1.5"
                  style={{
                    backgroundColor:
                      theme === "light"
                        ? "var(--secondaryGray)"
                        : "var(--primaryGray)",
                  }}
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={party.url_image_full || placeholderImage}
                      alt={party.nameParty}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = placeholderImage)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg truncate">
                      {party.name_party}
                    </h3>
                    <p className="text-purple-400 text-sm">
                      {party.name_organizer} - {party.name_country},{" "}
                      {party.name_town}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(party.date_start).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      ) : (
        <div
          className=" rounded-lg p-8 text-center"
          style={{ backgroundColor: "var(--primaryGray)" }}
        >
          No recent events available.
        </div>
      )}
    </div>
  );
};
