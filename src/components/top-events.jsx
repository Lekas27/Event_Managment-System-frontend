import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-context.jsx";
import placeholderImage from "../assets/placeholder.png";

export const TopEvents = ({ events }) => {
  const oddEvents = events.filter((_, index) => index % 2 !== 0); // Get only odd-indexed events
  const [visibleCount, setVisibleCount] = useState(6);
  const { theme } = useTheme();

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="mx-auto mt-8">
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          theme == "light" ? "text-purple-900" : "text-white"
        }`}
      >
        Top Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {oddEvents.slice(0, visibleCount).map((event) => (
          <div
            key={event.id}
            className="top-card rounded-lg overflow-hidden flex xl:flex-row flex-col items-center xl:items-start p-4"
            style={{
              backgroundColor:
                theme === "light"
                  ? "var(--secondaryGray)"
                  : "var(--primaryGray)",
            }}
          >
            {/* Image Section */}
            <div className="w-full xl:w-[40%] aspect-square shrink-0">
              <img
                src={event.urlImageFull || placeholderImage}
                alt={event.nameParty}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full xl:w-[60%] mt-4 xl:mt-0 xl:ml-4 flex flex-col text-white text-center xl:text-left h-full">
              <h3 className="text-lg font-bold mb-1">{event.nameParty}</h3>
              <p className="text-sm text-gray-300 mb-1">{event.nameType}</p>
              <p className="text-sm mb-1">
                {event.nameCountry}, {event.nameTown}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(event.dateStart).toLocaleString()} -{" "}
                {new Date(event.dateEnd).toLocaleString()}
              </p>

              <div className="mt-auto">
                <Link to={`/parties/${event.id}`}>
                  <button className="primary-button w-full px-4 py-2 text-white rounded-lg transition cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < oddEvents.length && (
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleLoadMore}
            className="primary-button mb-4 px-6 py-2 text-white rounded-lg transition cursor-pointer"
          >
            Load More
          </button>

          {/* Fog Preview Section */}
          <div className="grid grid-cols-1 h-24 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-none opacity-40 blur-sm">
            {oddEvents.slice(visibleCount, visibleCount + 3).map((event) => (
              <div
                key={event.id}
                className="top-card rounded-lg overflow-hidden flex xl:flex-row flex-col items-center xl:items-start p-4"
                style={{ backgroundColor: "var(--primaryGray)" }}
              >
                {/* Image Section */}
                <div className="w-full xl:w-[40%] aspect-square shrink-0">
                  <img
                    src={event.urlImageFull || placeholderImage}
                    alt={event.nameParty}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full xl:w-[60%] mt-4 xl:mt-0 xl:ml-4 flex flex-col text-white text-center xl:text-left h-full">
                  <h3 className="text-lg font-bold mb-1">{event.nameParty}</h3>
                  <p className="text-sm text-gray-300 mb-1">{event.nameType}</p>
                  <p className="text-sm mb-1">
                    {event.nameCountry}, {event.nameTown}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(event.dateStart).toLocaleString()} -{" "}
                    {new Date(event.dateEnd).toLocaleString()}
                  </p>

                  <div className="mt-auto">
                    <Link to={`/parties/${event.id}`}>
                      <button className="primary-button w-full px-4 py-2 text-white rounded-lg transition cursor-pointer">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
