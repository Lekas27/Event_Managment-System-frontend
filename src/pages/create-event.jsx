import { useForm } from "react-hook-form";
import { EventInput } from "../components/event-input";
import { useParties } from "../hooks/use-parties";
import citiesData from "../datas/cities.json"; // Import cities data
import partyTypesData from "../datas/event-types.json";
import { useState, useEffect } from "react";

export const CreateEventPage = () => {
  const { CreateEvent } = useParties();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [distinctCountries, setDistinctCountries] = useState([]);

  const watchedCountry = watch("nameCountry");

  useEffect(() => {
    // Extract distinct countries on component mount
    const countries = [...new Set(citiesData.map((city) => city.country))];
    setDistinctCountries(countries);
  }, []);

  useEffect(() => {
    if (watchedCountry) {
      setSelectedCountry(watchedCountry);
      const citiesInCountry = citiesData.filter(
        (city) => city.country === watchedCountry
      );
      const cityNames = citiesInCountry.map((city) => city.name);
      setFilteredCities(cityNames);
    } else {
      setSelectedCountry("");
      setFilteredCities([]);
    }
  }, [watchedCountry]);

  const onSubmit = (data) => {
    try {
      console.log("Form Data:", data);
      CreateEvent(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-10 bg-gray-900 text-white rounded-xl shadow-xl mt-3 mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-primaryPurple text-center mb-8">
        Create Event
      </h1>
      <form
        className="space-y-6 text-lg text-lightGray"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EventInput
            type="text"
            placeholder="Party Name"
            {...register("nameParty", { required: "Party Name is required." })}
            error={errors.nameParty?.message}
          />
          <EventInput
            type="url"
            placeholder="Image URL"
            {...register("urlImageFull", {
              required: "Image URL is required.",
              pattern: {
                value: /^https?:\/\/.+\..+/i,
                message: "Invalid URL.",
              },
            })}
            error={errors.urlImageFull?.message}
          />

          <EventInput
            type="datetime-local"
            {...register("dateStart", { required: "Start Date is required." })}
            error={errors.dateStart?.message}
          />
          <EventInput
            type="datetime-local"
            {...register("dateEnd", {
              required: "End Date is required.",
              validate: (value, { dateStart }) =>
                new Date(value) > new Date(dateStart) ||
                "End date must be after start date.",
            })}
            error={errors.dateEnd?.message}
          />
          <div className="relative">
            <select
              defaultValue=""
              {...register("nameCountry", { required: "Country is required." })}
              className={`w-full p-3 rounded-lg bg-gray-800 text-white border-2 ${
                errors.nameCountry?.message ? "border-red-500" : "border-none"
              } focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                errors.nameCountry?.message ? "focus:ring-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select Country
              </option>
              {distinctCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.nameCountry?.message && (
              <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
                {errors.nameCountry.message}
              </span>
            )}
          </div>
          <div className="relative">
            <select
              defaultValue=""
              {...register("nameTown", { required: "Town is required." })}
              className={`w-full p-3 rounded-lg bg-gray-800 text-white border-2 ${
                errors.nameTown?.message ? "border-red-500" : "border-none"
              } focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                errors.nameTown?.message ? "focus:ring-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select Town
              </option>
              {filteredCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.nameTown?.message && (
              <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
                {errors.nameTown.message}
              </span>
            )}
          </div>
          <div className="relative">
            <select
              defaultValue=""
              {...register("nameType", { required: "Event Type is required." })}
              className={`w-full p-3 rounded-lg bg-gray-800 text-white border-2 ${
                errors.nameType?.message ? "border-red-500" : "border-none"
              } focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                errors.nameType?.message ? "focus:ring-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select Event Type
              </option>
              {partyTypesData.parties.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.nameType?.message && (
              <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
                {errors.nameType.message}
              </span>
            )}
          </div>
          <EventInput
            type="text"
            placeholder="Entry Fee"
            {...register("textEntryFee", {
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid entry fee format.",
              },
            })}
            error={errors.textEntryFee?.message}
          />
        </div>
        <textarea
          placeholder="Event Description"
          className="p-3 rounded-lg w-full bg-gray-800 text-white"
          rows="4"
          {...register("textMore")}
        ></textarea>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EventInput
            type="url"
            placeholder="Organizer URL"
            {...register("urlOrganizer", {
              pattern: {
                value: /^https?:\/\/.+\..+/i,
                message: "Invalid URL.",
              },
            })}
            error={errors.urlOrganizer?.message}
          />
          <EventInput
            type="url"
            placeholder="Event Page URL"
            {...register("urlParty", {
              pattern: {
                value: /^https?:\/\/.+\..+/i,
                message: "Invalid URL.",
              },
            })}
            error={errors.urlParty?.message}
          />
        </div>
        <button
          type="submit"
          className="text-lg font-semibold bg-primaryPurple text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:scale-105 hover:bg-purple-600 transform hover:shadow-xl w-full"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};
