import React, { useState } from "react";
import registerImage from "../assets/undraw_login.svg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/theme-context";
import { useAuth } from "../hooks/use-auth"; // Prilagodi putanju ako je različita

export const RegisterPopup = ({ className }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!username || !email || !password || !passwordConfirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(username, email, password);
      setError("");
      console.log("Registration successful!");
      // Optionally redirect or auto-login
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div
      className={"flex justify-center items-center h-screen " + className}
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <div
        className="w-5/6 md:w-3/6 p-8 rounded-lg shadow-lg flex items-center"
        style={{
          backgroundColor:
            theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
        }}
      >
        <div className="w-1/2 hidden xl:block">
          <img src={registerImage} alt="register illustration" />
        </div>
        <div className="w-full sm:w-2/3 xl:w-1/2 mx-auto xl:mx-0">
          <h1 className="text-2xl font-bold text-center text-white mb-6 uppercase">
            Register
          </h1>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute end-0 mt-2 me-2 text-white cursor-pointer"
                size="2xl"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="absolute end-0 mt-2 me-2 text-white cursor-pointer"
                size="2xl"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>
          <button
            className="w-full p-3 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-all duration-300 ease-in-out cursor-pointer mb-4"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
