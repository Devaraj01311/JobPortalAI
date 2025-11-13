import { useEffect, useState } from "react";
import axios from "axios";
import LatestJobs from "../Components/LatestJobs";
import Footer from "../Components/Footer";
import CareerSection from "../Components/CareerSection";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  // Fetch jobs
  const fetchJobs = async (query = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/jobs?search=${query}`);
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [API]);

  // Search with debounce
  useEffect(() => {
    const delay = setTimeout(() => fetchJobs(search), 500);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔍 Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <form
          onSubmit={handleSearch}
          className="relative flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2"
        >
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 w-full sm:w-auto"
          >
            Search
          </button>
        </form>
      </div>

      {/* 🔁 Loading Spinner */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center space-x-3">
            <svg
              className="animate-spin h-6 w-6 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span className="text-base sm:text-lg font-medium text-gray-700">
              Loading jobs...
            </span>
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6">
          <LatestJobs jobs={jobs} />
        </div>
      )}

      {/* 📈 Career Tips + Footer */}
      <div className="mt-10">
        <CareerSection />
        <Footer />
      </div>
    </div>
  );
};

export default JobsPage;
