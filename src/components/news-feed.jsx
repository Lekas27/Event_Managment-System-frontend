import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import { useTheme } from "../context/theme-context";
export const NewsFeed = ({ parties }) => {
  const { theme } = useTheme();
  const latestParties = [...parties]
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    .slice(0, 2);

  return (
    <div className="w-full lg:w-1/4">
      <h2 className="text-2xl font-bold mb-6">Latest Events</h2>
      {latestParties.length > 0 ? (
        <div className="space-y-4">
          {latestParties.map((party) => (
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
                    src={
                      party.urlImageSmall || party.urlImageMedium
                        ? party.urlImageSmall || party.urlImageMedium
                        : placeholderImage
                    }
                    alt={party.nameParty}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = placeholderImage)}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg truncate">
                    {party.nameParty}
                  </h3>
                  <p className="text-purple-400 text-sm">
                    {party.nameOrganizer} - {party.nameCountry},{" "}
                    {party.nameTown}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(party.dateStart).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
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
