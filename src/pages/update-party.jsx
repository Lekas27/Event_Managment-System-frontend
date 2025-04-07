import { useState, useEffect } from "react";
import { useParty } from "../hooks/use-party";
import placeholderImage from "../assets/placeholder.png";
import { useTheme } from "../context/theme-context";
import { SpinLoader } from "../components/spin-loader";
import { UpdateInput } from "../components/update-input";
import { useParties } from "../hooks/use-parties";
import citiesData from "../datas/cities.json";
import partyTypesData from "../datas/event-types.json";

export const UpdateParty = () => {
  const { party, loading, error } = useParty();
  const { theme } = useTheme();
  const { updateParty } = useParties();

  const [partyData, setPartyData] = useState({
    name_party: "",
    url_image_full: "",
    name_organizer: "",
    date_start: "",
    date_end: "",
    name_town: "",
    name_country: "",
    name_type: "",
    text_entry_fee: "",
    text_more: "",
    url_organizer: "",
    url_party: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [distinctCountries, setDistinctCountries] = useState([]);

  useEffect(() => {
    // Extract distinct countries on component mount
    const countries = [...new Set(citiesData.map((city) => city.country))];
    setDistinctCountries(countries);
  }, []);

  useEffect(() => {
    if (party) {
      setPartyData({
        name_party: party.name_party || "",
        url_image_full: party.url_image_full || "",
        name_organizer: party.name_organizer || "",
        date_start: party.date_start
          ? new Date(party.date_start).toISOString().slice(0, 10) // Format for date input
          : "",
        date_end: party.date_end
          ? new Date(party.date_end).toISOString().slice(0, 10) // Format for date input
          : "",
        name_town: party.name_town || "",
        name_country: party.name_country || "",
        name_type: party.name_type || "",
        text_entry_fee: party.text_entry_fee?.toString() || "0",
        text_more: party.text_more || "",
        url_organizer: party.url_organizer || "",
        url_party: party.url_party || "",
      });
      // Initialize selected country and filter cities on load
      if (party.name_country) {
        setSelectedCountry(party.name_country);
        const citiesInCountry = citiesData.filter(
          (city) => city.country === party.name_country
        );
        setFilteredCities(citiesInCountry.map((city) => city.name));
      }
    }
  }, [party]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update filtered cities if the country changes
    if (name === "name_country") {
      setSelectedCountry(value);
      const citiesInCountry = citiesData.filter(
        (city) => city.country === value
      );
      setFilteredCities(citiesInCountry.map((city) => city.name));
      // Reset town if country changes
      setPartyData((prevData) => ({ ...prevData, name_town: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!partyData.name_party.trim()) {
      alert("Party name is required.");
      return;
    }

    try {
      await updateParty(party.id, {
        name_party: partyData.name_party,
        url_image_full: partyData.url_image_full || "",
        name_organizer: partyData.name_organizer,
        date_start: partyData.date_start
          ? new Date(partyData.date_start).toISOString()
          : null,
        date_end: partyData.date_end
          ? new Date(partyData.date_end).toISOString()
          : null,
        name_town: partyData.name_town,
        name_country: partyData.name_country,
        name_type: partyData.name_type,
        text_entry_fee: parseFloat(partyData.text_entry_fee) || 0,
        text_more: partyData.text_more,
        url_organizer: partyData.url_organizer,
        url_party: partyData.url_party,
      });
      console.log("Party updated successfully");
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error updating party:", error);
      // Optionally, show an error message to the user
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PARTY NAME + IMAGE */}
        <div className="text-center mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Party Name
          </label>
          <UpdateInput
            type="text"
            placeholder="Party Name"
            value={partyData.name_party}
            name="name_party"
            onChange={handleInputChange}
          />
          <img
            src={partyData.url_image_full || placeholderImage}
            alt={partyData.name_party}
            className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg mt-4"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
        </div>

        {/* ORGANIZER */}
        <div className="p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
            Organizer Info
          </h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Organizer Name</span>
              <UpdateInput
                type="text"
                placeholder="Organizer Name"
                value={partyData.name_organizer}
                name="name_organizer"
                onChange={handleInputChange}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Organizer Website</span>
              <UpdateInput
                type="text"
                placeholder="Organizer Website"
                value={partyData.url_organizer}
                name="url_organizer"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        {/* EVENT DETAILS */}
        <div className="p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
            Event Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              <span className="text-gray-700">Start Date</span>
              <UpdateInput
                type="date"
                value={partyData.date_start}
                name="date_start"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span className="text-gray-700">End Date</span>
              <UpdateInput
                type="date"
                value={partyData.date_end}
                name="date_end"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span className="text-gray-700">Town</span>
              <UpdateInput
                type="select"
                value={partyData.name_town}
                placeholder="Select Town"
                name="name_town"
                onChange={handleInputChange}
                options={filteredCities}
              />
            </label>
            <label>
              <span className="text-gray-700">Country</span>
              <UpdateInput
                type="select"
                value={partyData.name_country}
                placeholder="Select Country"
                name="name_country"
                onChange={handleInputChange}
                options={distinctCountries}
              />
            </label>
            <label>
              <span className="text-gray-700">Event Type</span>
              <UpdateInput
                type="select"
                value={partyData.name_type}
                placeholder="Select Event Type"
                name="name_type"
                onChange={handleInputChange}
                options={partyTypesData.parties}
              />
            </label>
            <label>
              <span className="text-gray-700">Entry Fee (€)</span>
              <UpdateInput
                type="number"
                value={partyData.text_entry_fee}
                placeholder="Entry Fee"
                name="text_entry_fee"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
            Event Description & Links
          </h3>
          <div className="space-y-4">
            <label>
              <span className="text-gray-700">Description</span>
              <UpdateInput
                type="text"
                value={partyData.text_more}
                placeholder="Event Description"
                name="text_more"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span className="text-gray-700">Party Website</span>
              <UpdateInput
                type="text"
                value={partyData.url_party}
                placeholder="Party Website"
                name="url_party"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span className="text-gray-700">Image URL</span>
              <UpdateInput
                type="text"
                value={partyData.url_image_full}
                placeholder="Image URL"
                name="url_image_full"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-primaryPurple text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-300 cursor-pointer"
          >
            Update Party
          </button>
        </div>
      </form>
    </div>
  );
};
