
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

  // Fetch jobs from API
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

  // Handle Search Button click
  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  // Real-time search while typing (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs(search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-24 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <div className="text-center py-10">
  <div className="inline-flex items-center space-x-2">
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
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
    <span className="text-lg font-medium text-gray-700">Loading jobs...</span>
  </div>
</div>
      ) : (
        <LatestJobs jobs={jobs} />
      )}
      <CareerSection/>
      <Footer />
    </div>
  );
};

export default JobsPage;
