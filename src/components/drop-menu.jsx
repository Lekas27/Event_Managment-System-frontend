import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "../assets/logoES-nobg.png";
import { useAuthContext } from "../context/auth-context";
import { useTheme } from "../context/theme-context";

export const DropMenuComponent = ({ onclick, isdrop, children, icon }) => {
  const { theme } = useTheme();
  return (
    <div className="relative inline-block">
      <button
        className="text-white p-2 hover:text-purple-700 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={onclick}
      >
        {icon}
      </button>
      {isdrop && (
        <div
          className={`absolute left-0 top-full z-10 rounded-md shadow-lg mt-2 p-4 min-w-[200px] ${
            theme === "light"
              ? "bg-white text-gray-800"
              : "bg-gray-800 text-white"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
