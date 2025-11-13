import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user: authUser, logout } = useContext(AuthContext);
  const [user, setUser] = useState(authUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        ...res.data,
        resume: res.data.resume ? res.data.resume.replace(/\\/g, "/") : null,
      });
    } catch {
      console.log("Failed to fetch user info");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-gray-200 transition"
        >
          JobPortal<span className="text-yellow-400 text-3xl"> AI</span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-semibold relative">
          {user ? (
            <>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
              <Link to="/jobs" className="hover:text-yellow-300 transition">
                Jobs
              </Link>
              <Link
                to="/applications"
                className="hover:text-yellow-300 transition"
              >
                Applications
              </Link>
              <button
                onClick={() => navigate("/resume")}
                className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {user.resume ? "Manage Resume" : "Upload Resume"}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded z-50">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="mt-2 text-sm">
                        Resume:{" "}
                        {user.resume ? (
                          <a
                            href={`${API}/${user.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 font-medium underline hover:text-green-800"
                          >
                            Uploaded
                          </a>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Not Uploaded
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-white/40 hover:bg-white hover:text-blue-900 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4 text-center text-sm font-medium">
          {user ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>
              <Link to="/applications" onClick={() => setMenuOpen(false)}>
                Applications
              </Link>
              <button
                onClick={() => {
                  navigate("/resume");
                  setMenuOpen(false);
                }}
                className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
              >
                {user.resume ? "Manage Resume" : "Upload Resume"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
