import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { AdminSideBarButton } from "../components/AdminSideBarButton.jsx";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { AuthProvider } from "../context/auth-context.jsx";
import { ThemeProvider } from "../context/theme-context.jsx";

export const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const handleSideBarOpen = () => {
    setOpen(!open);
  };
  function handleClickOutsideSideBar(event) {
    if (!isSmallScreen) return;
    const sideBar = document.getElementById("side-bar");
    if (sideBar && !sideBar.contains(event.target)) {
      setOpen(false);
    }
  }
  const handleButtonClick = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleChange = (e) => setIsSmallScreen(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <div
          className={"w-full overflow-y-hidden"}
          onClick={(e) => handleClickOutsideSideBar(e)}
        >
          {open && (
            <div
              id={"side-bar"}
              className={
                "fixed start-0 top-0 w-60 h-full px-4 py-6 bg-gray-900 flex flex-col gap-4 z-50 shadow-lg"
              }
            >
              <span className="text-2xl font-bold tracking-wide text-white mx-auto mb-4">
                ADMIN PANEL
              </span>

              <AdminSideBarButton
                label="Users"
                color="purple"
                icon={<UserOutlined />}
                onClick={(e) => handleButtonClick(e, "/admin/users")}
              />
              <AdminSideBarButton
                label="Events"
                color="purple"
                icon={<FontAwesomeIcon icon={faCalendar} />}
                onClick={(e) => handleButtonClick(e, "/admin/events")}
              />

              <hr className="border-purple-600 mt-2" />

              <AdminSideBarButton
                className="mt-2"
                label="Users chart"
                color="purple"
                onClick={(e) => handleButtonClick(e, "/admin/users/chart")}
              />
              <AdminSideBarButton
                label="Events chart"
                onClick={(e) => handleButtonClick(e, "/admin/events/chart")}
                color="purple"
              />
              <hr className="border-purple-600" />
            </div>
          )}
          <div
            id="navigation"
            className={`border-b-2 border-purple-600 h-14 flex justify-between items-center pe-6 ps-6 my-3 ${
              open ? "lg:ps-72" : undefined
            }`}
          >
            <div className={"flex items-center gap-x-2 text-white"}>
              <MenuOutlined
                onClick={handleSideBarOpen}
                className={"text-4xl text-white"}
              />
            </div>
            <div className="lex justify-center items-center">
              <button
                onClick={() => navigate("/")}
                className="text-white mx-2 cursor-pointer border-transparent border-b-2 hover:border-purple-600 transition-all duration-100"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/parties")}
                className="text-white mx-2 cursor-pointer border-transparent border-b-2 hover:border-purple-600 transition-all duration-100"
              >
                Parties
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-white mx-2 cursor-pointer border-transparent border-b-2 hover:border-purple-600 transition-all duration-100"
              >
                About
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="text-white mx-2 cursor-pointer border-b-2 border-transparent hover:border-purple-600 transition-all duration-100"
              >
                Calendar
              </button>
            </div>
          </div>
          <div
            className={`w-full pt-4 px-0 sm:px-6 ${
              open ? "lg:ps-72" : undefined
            }`}
          >
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};
