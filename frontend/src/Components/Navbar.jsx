// src/components/Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user: authUser, logout } = useContext(AuthContext);
  const [user, setUser] = useState(authUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    } catch (err) {
      console.log("Failed to fetch user info");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white px-8 py-4 shadow-lg flex justify-between  items-center">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-gray-200 transition"
      >
        JobPortal<span className="text-yellow-400 text-3xl"> AI</span>
      </Link>
      {user ? (
        <div className="flex items-center gap-6 font-semibold relative">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/jobs" className="hover:text-yellow-300 transition">Jobs</Link>
          <Link to="/applications" className="hover:text-yellow-300 transition">Applications</Link>
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
          <div className="relative">
            <button
              onClick={toggleDropdown}
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
                    {user.resume && user.resume.trim() !== "" ? (
                      <a
                        href={`${API}/${user.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-medium underline hover:text-green-800"
                      >
                        Uploaded
                      </a>
                    ) : (
                      <span className="text-red-600 font-medium">Not Uploaded</span>
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
        </div>
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
    </nav>
  );
};

export default Navbar;
