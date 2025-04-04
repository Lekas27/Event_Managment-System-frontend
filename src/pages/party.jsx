import { useParty } from "../hooks/use-party";
import placeholderImage from "../assets/placeholder.png";
import { PartyMap } from "../components/party-map";
import { SpinLoader } from "../components/spin-loader";
import { useTheme } from "../context/theme-context";
export const Party = () => {
  const { party, loading, error } = useParty();
  const { theme } = useTheme();
  if (loading) {
    return (
      <div className="h-100">
        <SpinLoader />
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-xl text-red-600">
        Error loading party details: {error.message}
      </h2>
    );
  }

  if (!party) {
    return (
      <h2 className="text-center text-xl text-purple-700">Party not found</h2>
    );
  }

  return (
    <div
      className="max-w-screen-lg mx-auto px-4 sm:px-6 py-10 rounded-xl shadow-xl mt-3 mb-5"
      style={{
        backgroundColor:
          theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
      }}
    >
      {/* Party Title and Image */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primaryPurple bg-clip-text text-transparent mb-4">
          {party.name_party}
        </h1>
        <img
          src={party.url_image_full || placeholderImage}
          alt={party.name_party}
          className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
      </div>

      {/* Party Details */}
      <div className="space-y-6 text-lg text-lightGray">
        <div className="p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700">
            Organizer
          </h2>
          <p className="text-white">{party.name_organizer}</p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-3 text-white w-full sm:w-1/2">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700">
              Event Details
            </h2>
            <p>
              <span className="font-semibold">Start Date:</span>{" "}
              {new Date(party.date_start).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">End Date:</span>{" "}
              {new Date(party.date_end).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {party.name_town}
              , {party.name_country}
            </p>
            <p>
              <span className="font-semibold">Event Type:</span>{" "}
              {party.name_type}
            </p>
            <p>
              <span className="font-semibold">Entry Fee:</span>{" "}
              {party.text_entry_fee || "To be announced"}
            </p>
          </div>

          {/* <PartyMap
            names={[party.name_party]}
            locations={[`${party.name_town}, ${party.name_country}`]}
          /> */}
        </div>

        {/* Description */}
        <div className="p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-purple-700">
            About the Event:
          </h3>
          <p className="text-white">
            {party.text_more
              ? party.text_more
              : "There is no text for this event"}
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 space-y-3 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            More Info:
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={party.url_organizer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold bg-primaryPurple text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:scale-105 hover:bg-purple-600 transform hover:shadow-xl"
            >
              Facebook Event Page
            </a>
            <a
              href={party.url_party}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold bg-primaryPurple text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:scale-105 hover:bg-purple-600 transform hover:shadow-xl"
            >
              Goabase Party Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
