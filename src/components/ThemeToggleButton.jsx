import React from "react";
import { useTheme } from "../context/theme-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FontAwesomeIcon
          icon={faMoon}
          className="text-gray-600 dark:text-gray-300"
        />
      ) : (
        <FontAwesomeIcon
          icon={faSun}
          className="text-gray-600 dark:text-gray-300"
        />
      )}
    </button>
  );
};
