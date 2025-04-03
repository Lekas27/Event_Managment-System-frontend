import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import { useTheme } from "../context/theme-context.jsx";

export const UpcomingEvents = ({ parties }) => {
  const { theme } = useTheme();
  const upcomingParties = parties
    .filter((party) => new Date(party.dateStart) > new Date())
    .sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
    .slice(0, 3);

  return (
    <div className="mt-16">
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === "light" ? "text-purple-900" : "text-white"
        }`}
      >
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingParties.map((party) => (
          <div
            key={party.id}
            className="rounded-lg overflow-hidden flex flex-col h-full"
            style={{
              backgroundColor:
                theme === "light"
                  ? "var(--secondaryGray)"
                  : "var(--primaryGray)",
            }}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={party.urlImageMedium || placeholderImage}
                alt={party.nameParty}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text and button area */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-lg mb-2 text-white">
                {party.nameParty}
              </h3>

              <div className="mt-auto">
                <p className="text-purple-400 mb-1">
                  {party.nameOrganizer} – {party.nameCountry}, {party.nameTown}
                </p>
                <p className="text-gray-400 mb-3">
                  {new Date(party.dateStart).toLocaleDateString()}
                </p>
                <Link to={`/parties/${party.id}`}>
                  <button className="primary-button text-white py-2 px-4 rounded-full transition duration-300 w-full cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
