import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useTheme } from "../context/theme-context";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`text-white py-10 `}
      style={{
        backgroundColor:
          theme === "light" ? "var(--secondaryGray)" : "var(--primaryGray)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand/Info */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-purple-400">
            Event Management System
          </h2>
          <p className="text-gray-400">
            Discover and manage events across the world with ease. Built for
            organizers and party lovers alike.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-purple-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/parties" className="hover:text-purple-400">
                Parties
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-purple-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-purple-400">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-purple-400 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="hover:text-purple-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-purple-400 transition" />
            </a>
            <a href="mailto:contact@eventsystem.com">
              <Mail className="hover:text-purple-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-purple-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Event Management System. All rights
        reserved.
      </div>
    </footer>
  );
};
