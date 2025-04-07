import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-context";

import placeholderImage from "../assets/placeholder.png";

export const CardComponent = ({
  title,
  organizer,
  image,
  dateStart,
  dateEnd,
  id,
  country,
  isCurrentUser,
  user,
  onDelete,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className=" shadow-lg rounded-2xl overflow-hidden w-80 p-4 mx-auto mt-4 flex flex-col h-full"
      style={{
        backgroundColor:
          theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
      }}
    >
      <img
        src={image ? image : placeholderImage}
        alt={title}
        className="w-full h-48 object-cover rounded-xl"
        onError={(e) => (e.target.src = placeholderImage)}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <h4 className="font-semibold text-white">
          Start Date: {new Date(dateStart).toLocaleString()}
        </h4>
        <h4 className="font-semibold text-white">
          End Date: {new Date(dateEnd).toLocaleString()}
        </h4>
        <div className="mt-auto w-full flex-col justify-between">
          <p className="text-xl text-lightGray mt-2 pt-2">{organizer}</p>
          <p className="text-xl text-lightGray mt-2 pt-2">{country}</p>
          <div className="flex  justify-between items-center w-full">
            <button
              className={`px-4 mx-auto py-2 primary-button text-white rounded-lg hover:bg-opacity-80 transition cursor-pointer mt-2 w-full`}
            >
              <Link to={`/parties/${id}`}>Learn More</Link>
            </button>
            {user && isCurrentUser === user ? (
              <div className="absolute top-0 right-0 p-2 flex gap-2">
                <Link to={`/update-event/${id}`}>
                  <button className="px-2 py-1 primary-button text-white rounded-md cursor-pointer">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                </Link>
                <button
                  className="px-2 py-1 primary-button text-white rounded-md cursor-pointer"
                  onClick={onDelete}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
