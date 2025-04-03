import { useForm } from "react-hook-form";
import { EventInput } from "../components/event-input";

export const CreateEventPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-10 bg-gray-900 text-white rounded-xl shadow-xl mt-3">
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
            type="text"
            placeholder="Organizer Name"
            {...register("nameOrganizer", {
              required: "Organizer Name is required.",
            })}
            error={errors.nameOrganizer?.message}
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
          <EventInput
            type="text"
            placeholder="Town"
            {...register("nameTown", { required: "Town is required." })}
            error={errors.nameTown?.message}
          />
          <EventInput
            type="text"
            placeholder="Country"
            {...register("nameCountry", { required: "Country is required." })}
            error={errors.nameCountry?.message}
          />
          <EventInput
            type="text"
            placeholder="Event Type"
            {...register("nameType", { required: "Event Type is required." })}
            error={errors.nameType?.message}
          />
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
