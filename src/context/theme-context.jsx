import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("color-theme");
    if (storedTheme) {
      return storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("color-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
