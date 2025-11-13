import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import { FaUser, FaRobot } from "react-icons/fa";
import Footer from "../Components/Footer";
import ApplicationSection from "../Components/ApplicationSection";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(`${API}/api/jobs/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <Loader />;

  // Filter by source
  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((job) =>
          filter === "manual"
            ? job.source === "internal"
            : job.source === "external"
        );

  // Filter by search input (title or company)
  const displayedApplications = filteredApplications.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  // Highlight function
  const highlightText = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ===== Header Section ===== */}
      <div className="p-4 sm:p-6 bg-gray-100 rounded-tr-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 text-center sm:text-left">
          My <span className="text-blue-500 text-2xl sm:text-3xl">Applications</span>
        </h2>

        {/* ===== Filters & Search ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-l-lg text-sm sm:text-base ${
                filter === "all" ? "bg-yellow-400 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("manual")}
              className={`px-4 py-2 text-sm sm:text-base ${
                filter === "manual" ? "bg-yellow-400 text-white" : "bg-gray-200"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setFilter("auto")}
              className={`px-4 py-2 rounded-r-lg text-sm sm:text-base ${
                filter === "auto" ? "bg-yellow-400 text-white" : "bg-gray-200"
              }`}
            >
              Auto-applied
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 sm:mt-0 sm:ml-auto px-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* ===== Applications Grid ===== */}
        {displayedApplications.length === 0 ? (
          <p className="text-gray-600 text-center sm:text-left">
            No applications found...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedApplications.map((job) => (
              <div
                key={job._id}
                className={`relative bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 ${
                  job.source === "internal"
                    ? "border-green-500"
                    : "border-purple-500"
                }`}
              >
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                    job.source === "internal"
                      ? "bg-gradient-to-r from-green-200 to-green-400 text-green-900"
                      : "bg-gradient-to-r from-purple-200 to-purple-400 text-purple-900"
                  }`}
                >
                  {job.source === "internal" ? <FaUser /> : <FaRobot />}
                  {job.source === "internal" ? "Manual" : "Auto-applied"}
                </span>

                <h3 className="font-bold text-base sm:text-lg mb-2 mt-6 text-gray-800 break-words">
                  {highlightText(job.title)}
                </h3>
                <p className="text-blue-800 font-semibold mb-1 text-sm sm:text-base">
                  {highlightText(job.company)}
                </p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Applied on {new Date(job.appliedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Application Section & Footer ===== */}
      <div className="mt-10">
        <ApplicationSection />
      </div>
      <Footer />
    </div>
  );
};

export default Applications;
