import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logoImage from "../assets/logoES-nobg.png";
import { useAuthContext } from "../context/auth-context";
import { DropMenuComponent } from "./drop-menu";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useTheme } from "../context/theme-context";

export const NavbarComponent = () => {
  const [isArrowVisible, setArrowVisible] = useState(false);
  const [isBurgerVisible, setBurgerVisible] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();
  const [isUserDropVisible, setUserDropVisible] = useState(false);
  const [isArrowDropVisible, setArrowDropVisible] = useState(false);
  const [isLightTheme, setLightTheme] = useState(false);
  const { theme } = useTheme();

  // Refs for dropdown menus
  const arrowDropRef = useRef(null);
  const userDropRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setArrowVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check Arrow Dropdown
      if (
        isArrowDropVisible &&
        arrowDropRef.current &&
        !arrowDropRef.current.contains(event.target)
      ) {
        setArrowDropVisible(false);
      }

      // Check User Dropdown
      if (
        isUserDropVisible &&
        userDropRef.current &&
        !userDropRef.current.contains(event.target)
      ) {
        setUserDropVisible(false);
      }
    };

    // Add click event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isArrowDropVisible, isUserDropVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBurgerClick = () => {
    setBurgerVisible(!isBurgerVisible);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/parties", label: "Parties" },
    { path: "/about", label: "About" },
  ];

  const toggleUserDrop = () => {
    setUserDropVisible(!isUserDropVisible);
  };

  const toggleArrowDrop = () => {
    setArrowDropVisible(!isArrowDropVisible);
  };

  const handleDropdownItemClick = (dropdownSetter) => {
    dropdownSetter(false);
  };

  const renderNavLink = (path, label, className = "", onClick = null) => (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? "border-b-purple-700 border-b-2" : ""
        } p-2 hover:text-purple-700 transition-all duration-300 ease-in-out ${className}`
      }
      to={path}
      onClick={onClick}
    >
      {label}
    </NavLink>
  );

  return (
    <>
      <nav
        className={`m-auto px-12 pt-8 md:pb-7 text-white`}
        style={{
          backgroundColor:
            theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
        }}
      >
        <div className="list-container flex justify-between w-5/7 m-auto md:items-center">
          <div className="logo-container flex justify-between items-center">
            <Link to="/">
              <img className="w-25" src={logoImage} alt="Logo" />
            </Link>
            <button
              onClick={handleBurgerClick}
              className="burger-button md:hidden"
              aria-label="Toggle mobile menu"
            >
              <i
                className={`fa-solid ${
                  isBurgerVisible ? "fa-times" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>
          <ul className="space-x-4 primary-nav-list hidden md:block">
            {navItems.map((item) => (
              <li key={item.path} className="inline">
                {renderNavLink(item.path, item.label)}
              </li>
            ))}
            <li className="inline" ref={arrowDropRef}>
              <DropMenuComponent
                onclick={toggleArrowDrop}
                isdrop={isArrowDropVisible}
                icon={
                  <>
                    Schedule
                    <i className="fa-solid fa-caret-down pl-3"></i>
                  </>
                }
              >
                <ul>
                  <li>
                    <NavLink
                      className="block py-2 px-4 hover:bg-purple-700 text-sm cursor-pointer w-full text-left"
                      to="/today"
                      onClick={() =>
                        handleDropdownItemClick(setArrowDropVisible)
                      }
                    >
                      Today
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 px-4 hover:bg-purple-700 text-sm cursor-pointer w-full text-left"
                      to="/week"
                      onClick={() =>
                        handleDropdownItemClick(setArrowDropVisible)
                      }
                    >
                      Week
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block py-2 px-4 hover:bg-purple-700 text-sm cursor-pointer w-full text-left"
                      to="/calendar"
                      onClick={() =>
                        handleDropdownItemClick(setArrowDropVisible)
                      }
                    >
                      Calendar
                    </NavLink>
                  </li>
                </ul>
              </DropMenuComponent>
            </li>
          </ul>
          <ul className="space-x-4 secondary-nav-list hidden md:block ml-6">
            {isAuthenticated ? (
              <>
                <li className="inline text-md" ref={userDropRef}>
                  <DropMenuComponent
                    onclick={toggleUserDrop}
                    isdrop={isUserDropVisible}
                    icon={<i className="fa-solid fa-user"></i>}
                  >
                    <ul>
                      <li>
                        <NavLink
                          className="block py-2 px-4 hover:bg-purple-700 text-sm cursor-pointer w-full text-left"
                          to="/user"
                          onClick={() =>
                            handleDropdownItemClick(setUserDropVisible)
                          }
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleDropdownItemClick(setUserDropVisible);
                            logout();
                          }}
                          className="block py-2 px-4 hover:bg-purple-700 text-sm cursor-pointer w-full text-left"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </DropMenuComponent>
                </li>
                <li className="inline text-md">
                  <NavLink
                    className="text-white p-2 hover:text-purple-700 transition-all duration-300 ease-in-out"
                    to="/create-event"
                  >
                    <i className="fa-solid fa-plus hover:text-purple-700"></i>
                  </NavLink>
                </li>
                <li className="inline text-md">
                  <NavLink
                    className="text-white p-2 hover:text-purple-700 transition-all duration-300 ease-in-out"
                    to="/admin"
                  >
                    <i className="fa-solid fa-lock"></i>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="inline">
                  <NavLink
                    className="nav-item px-4 py-2 font-bold outline-purple-700 outline-2 rounded-2xl hover:bg-purple-700"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="inline">
                  <NavLink
                    className="nav-item px-4 py-2 font-bold bg-purple-700 rounded-2xl hover:outline-purple-900 hover:outline-2 hover:bg-transparent"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="inline">
                  <ThemeToggleButton />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div
        className={`mobile-nav bg-gray-800 transition-all duration-300 ease-in-out text-white ${
          isBurgerVisible
            ? "max-h-128 opacity-100 visible"
            : "opacity-0 invisible max-h-0"
        } md:hidden`}
      >
        <ul className="py-4 px-12">
          {navItems.map((item) => (
            <li key={item.path} className="py-2">
              {renderNavLink(item.path, item.label, "block")}
            </li>
          ))}
          {isAuthenticated ? (
            <>
              <li className="py-2">
                <NavLink className="nav-item" to="/user">
                  Profile
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink className="nav-item" to="/create-event">
                  Event
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink className="nav-item" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="py-2">
                <NavLink className="nav-item" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink className="nav-item" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          <li className="py-2">
            <ThemeToggleButton />
          </li>
        </ul>
      </div>

      <div className="nav-border pb-1"></div>
      <button
        onClick={scrollToTop}
        className={`arrow-up m-5 text-l p-3 rounded ${
          isArrowVisible ? "opacity-100" : "opacity-0 hidden"
        }`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
};
