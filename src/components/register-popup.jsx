import React, { useState } from "react";
import registerImage from "../assets/undraw_login.svg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/theme-context";

export const RegisterPopup = ({ className, isAdmin = false }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
    console.log(decoded);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div
      className={"flex justify-center items-center h-screen " + className}
      style={{
        backgroundColor:
          theme == "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <div
        className="w-5/6 md:w-3/6 bg-gray-900 p-8 rounded-lg shadow-lg flex items-center"
        style={{
          backgroundColor:
            theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
        }}
      >
        <div className="w-1/2 hidden xl:block">
          <img src={registerImage} alt="" />
        </div>
        <div className={"w-full sm:w-2/3 xl:w-1/2 mx-auto xl:mx-0"}>
          <h1 className="text-2xl font-bold text-center text-white mb-6 uppercase">
            Register
          </h1>
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
            <div className={"relative"}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
              />
              {!showPassword ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className={"absolute end-0 mt-2 me-2"}
                  size={"2xl"}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className={"absolute end-0 mt-2 me-2"}
                  size={"2xl"}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            <div className={"relative"}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
              />
              {!showConfirmPassword ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className={"absolute end-0 mt-2 me-2"}
                  size={"2xl"}
                  onClick={() => setShowConfirmPassword(true)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className={"absolute end-0 mt-2 me-2"}
                  size={"2xl"}
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
            </div>
          </div>
          <button className="w-full p-3 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-all duration-300 ease-in-out hover:cursor-pointer mb-4">
            Register
          </button>
          {!isAdmin && (
            <GoogleOAuthProvider clientId="471502448680-s13pqot74qatipr3l7jlng4f0dvkqa8h.apps.googleusercontent.com">
              <div className="App">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  useOneTap
                />
              </div>
            </GoogleOAuthProvider>
          )}
        </div>
      </div>
    </div>
  );
};
