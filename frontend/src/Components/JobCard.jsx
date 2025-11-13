
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const JobCard = ({ job, highlighted = false }) => {
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const isApplied = job.appliedUsers?.includes(user?.id);

  const [showFullDesc, setShowFullDesc] = useState(false);

  const applyJob = async () => {
    if (isApplied) return;
    try {
      await axios.post(
        `${API}/api/jobs/apply/${job.externalId || job._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Applied to ${job.title}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Apply failed");
    }
  };

  const formattedDate = job.created
    ? new Date(job.created).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  const truncatedDesc =
    job.description?.length > 120
      ? job.description.slice(0, 120) + "..."
      : job.description;

  return (
    <div
      className={`relative w-80 flex-shrink-0 snap-start rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border p-6 ${
        highlighted
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full overflow-hidden ${
              highlighted ? "bg-white/20" : "bg-gray-100"
            }`}
          >
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-8 h-8" />
            ) : (
              <span
                className={`text-sm font-bold ${
                  highlighted ? "text-white" : "text-gray-500"
                }`}
              >
                {job.company?.[0] || "C"}
              </span>
            )}
          </div>
          <div>
            <p
              className={`text-sm font-semibold ${
                highlighted ? "text-white" : "text-gray-700"
              }`}
            >
              {job.company}
            </p>
            <p
              className={`text-xs ${
                highlighted ? "text-white/70" : "text-gray-400"
              }`}
            >
              {formattedDate}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            highlighted
              ? "bg-white/20 text-white"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {job.type || "Full Time"}
        </span>
      </div>
      <h3
        className={`text-lg font-bold mb-2 ${
          highlighted ? "text-white" : "text-gray-900"
        }`}
      >
        {job.title}
      </h3>
      <p
        className={`text-sm mb-4 ${
          highlighted ? "text-white/80" : "text-gray-500"
        }`}
      >
        {job.location || "Remote"}
      </p>
      <p
        className={`font-bold mb-4 text-base ${
          highlighted ? "text-green-200" : "text-green-600"
        }`}
      >
        {job.salary ? `$${job.salary}` : "Salary N/A"}
      </p>
      <p
        className={`text-sm mb-4 leading-relaxed ${
          highlighted ? "text-white/90" : "text-gray-600"
        }`}
      >
        {showFullDesc ? job.description : truncatedDesc}
        {job.description?.length > 120 && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className={`ml-2 text-xs ${
              highlighted
                ? "text-white hover:underline"
                : "text-blue-600 hover:underline"
            }`}
          >
            {showFullDesc ? "Show less" : "Read more"}
          </button>
        )}
      </p>
      <div className="flex items-center justify-between">
        <button
          onClick={applyJob}
          disabled={isApplied}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
            isApplied
              ? highlighted
                ? "bg-white/30 text-white cursor-not-allowed"
                : "bg-gray-200 text-gray-600 cursor-not-allowed"
              : highlighted
              ? "bg-white text-blue-600 hover:bg-gray-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isApplied ? "Applied ✓" : "Apply Now"}
        </button>

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${
              highlighted
                ? "text-white hover:underline"
                : "text-blue-600 hover:underline"
            }`}
          >
            View ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default JobCard;
