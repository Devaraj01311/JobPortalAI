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
  const API = import.meta.env.VITE_API_URL;
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
          filter === "manual" ? job.source === "internal" : job.source === "external"
        );

  // Filter by search input (title or company)
  const displayedApplications = filteredApplications.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  // Highlight function
  const highlightText = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
     <div>
    <div className="p-6 bg-gray-100 min-h-full rounded-tr-full">
      <h2 className="text-4xl font-bold mb-6">My <span className="text-3xl text-blue-500">Applications</span></h2>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="flex">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-l-lg ${
              filter === "all" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("manual")}
            className={`px-4 py-2 ${
              filter === "manual" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setFilter("auto")}
            className={`px-4 py-2 rounded-r-lg ${
              filter === "auto" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            Auto-applied
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 md:mt-0 md:ml-auto px-4 py-2 border rounded-lg w-full md:w-64"
        />
      </div>
      {displayedApplications.length === 0 ? (
        <p className="text-gray-600">No applications found...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedApplications.map((job) => (
            <div
              key={job._id}
              className={`relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 ${
                job.source === "internal" ? "border-green-500" : "border-purple-500"
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

              <h3 className="font-bold text-lg mb-2 mt-4 text-gray-800">{highlightText(job.title)}</h3>
              <p className="text-blue-800 font-semibold mb-1">{highlightText(job.company)}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-xs text-gray-400 mt-2">
                Applied on {new Date(job.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
   
        <ApplicationSection/>
      <Footer/>
    </div>
   
  );
};


export default Applications;
