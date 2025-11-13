import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

import LatestJobs from "../Components/LatestJobs";
import CompanyLogoSlider from "../Components/CompanyLogo";
import Footer from "../Components/Footer";
import Features from "../Components/Features";

const Home = () => {
  const { user: authUser, setUser } = useContext(AuthContext);
  const [user, setLocalUser] = useState(authUser);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = {
          ...res.data,
          resumeUrl: res.data.resume ? `${API}/uploads/${res.data.resume}` : null,
        };

        setLocalUser(userData);
        setUser(userData);
      } catch (err) {
        console.log("Failed to fetch user info", err);
      }
    };
    fetchUser();
  }, [token, setUser]);

  // Fetch jobs after user is loaded
  useEffect(() => {
    if (user?.resume) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-16 md:py-20 px-4 md:px-10 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Find Your{" "}
          <span className="text-yellow-400 text-4xl sm:text-5xl md:text-6xl">
            Dream Job
          </span>
        </h1>

        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto px-2">
          Discover opportunities tailored to your skills. Upload your resume and
          apply with a single click!
        </p>

        {/* ===== SEARCH BAR (Visible after resume upload) ===== */}
        {user?.resume && (
          <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row bg-white rounded-full shadow-lg overflow-hidden mt-4 sm:mt-6">
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-800 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={() => console.log("Search Query:", search)}
              className="bg-yellow-400 text-blue-900 px-6 py-3 font-semibold hover:bg-yellow-300 transition text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        )}

        {/* ===== Resume Button ===== */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/resume")}
            className="bg-yellow-400 text-blue-900 px-6 py-3 font-semibold rounded-full hover:bg-yellow-300 transition text-sm sm:text-base"
          >
            {user?.resume ? "Manage Resume" : "Upload Resume"}
          </button>
        </div>
      </section>

      {/* ===== JOB LISTING SECTION ===== */}
      {user?.resume && (
        <div className="px-4 md:px-10 py-10">
          <LatestJobs jobs={filteredJobs} loading={loading} />
        </div>
      )}

      {/* ===== FEATURES SECTION ===== */}
      <div className="px-4 md:px-10">
        <Features />
      </div>

      {/* ===== COMPANY SLIDER ===== */}
      <div className="mt-6 px-4 md:px-10">
        <CompanyLogoSlider />
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
};

export default Home;
