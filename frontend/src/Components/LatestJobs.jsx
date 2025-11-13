import { useEffect, useRef, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "./JobCard";
import Loader from "./Loader";
import axios from "axios";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sliderRef = useRef(null);

  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const uniqueJobs = [];
        const seen = new Set();

        res.data.forEach((job) => {
          const key = job._id || job.externalId;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueJobs.push(job);
          }
        });

        setJobs(uniqueJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API, token]);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const scrollAmount =
      dir === "left"
        ? -sliderRef.current.offsetWidth
        : sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const roleColors = [
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-yellow-100 text-yellow-600",
    "bg-red-100 text-red-600",
    "bg-indigo-100 text-indigo-600",
    "bg-orange-100 text-orange-600",
  ];

  const categories = useMemo(() => {
    const counts = {};
    jobs.forEach((job) => {
      const role = job.role || job.title || "Other";
      counts[role] = (counts[role] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count], idx) => ({
        name,
        count,
        color: roleColors[idx % roleColors.length],
      }));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!selectedCategory) return jobs;
    return jobs.filter(
      (job) => (job.role || job.title || "Other") === selectedCategory
    );
  }, [jobs, selectedCategory]);

  return (
    <section className="px-4 sm:px-6 md:px-10 py-10 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center md:text-left">
        <span className="text-blue-600 text-3xl md:text-4xl">Latest</span> Jobs
        Opportunity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Categories */}
        <div className="md:col-span-3 flex flex-wrap md:flex-col gap-3 justify-center md:justify-start">
          {/* Show All Option */}
          <div
            onClick={() => setSelectedCategory(null)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between w-fit md:w-full ${
              !selectedCategory
                ? "bg-blue-600 text-white ring-2 ring-blue-400"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span>Show All Jobs</span>
            <span className="ml-2 bg-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
              {jobs.length}
            </span>
          </div>

          {/* Dynamic Categories */}
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.name ? null : cat.name
                )
              }
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between w-fit md:w-full ${cat.color} ${
                selectedCategory === cat.name ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-2 bg-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
                {cat.count}
              </span>
            </div>
          ))}
        </div>

        {/* Job Slider */}
        <div className="md:col-span-9 relative">
          {/* Scroll Buttons (Hidden on Mobile) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Job Cards */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory relative min-h-[20rem] pb-4"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            ) : filteredJobs.length === 0 ? (
              <p className="text-gray-500 text-center w-full">
                No jobs found.
              </p>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={job._id || job.externalId || `job-${index}`}
                  className="snap-start flex-shrink-0 w-72 sm:w-80"
                >
                  <JobCard job={job} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
