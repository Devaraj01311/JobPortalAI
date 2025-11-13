import { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const ResumePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [resumeFile, setResumeFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB");
      return;
    }
    setResumeFile(file);
  };

  const uploadOrUpdateResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return toast.error("Select a resume to upload");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setLoading(true);
      const res = await axios.post(`${API}/api/auth/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      const updatedUser = {
        ...user,
        resume: res.data.user.resume,
        resumeUrl: `${API}/uploads/${res.data.user.resume}`,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setResumeFile(null);
      toast.success(res.data.message || "Resume uploaded successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API}/api/auth/delete-resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = { ...user, resume: "", resumeUrl: "" };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setShowDeleteModal(false);
      toast.success("Resume deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {/* ✅ Responsive layout container */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="bg-gray-100 w-full lg:w-3/5 min-h-[60vh] lg:min-h-screen flex items-center justify-center rounded-br-full lg:rounded-none px-4 py-10">
          <motion.div
            className="p-6 text-white w-full max-w-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-center lg:text-left text-black">
              Manage <span className="text-2xl text-blue-500">Resume</span>
            </h2>

            {user?.resume ? (
              <div className="mb-4 text-black text-center lg:text-left">
                <p>
                  Current Resume:{" "}
                  <a
                    href={user.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-words"
                  >
                    View Resume
                  </a>
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                  className="mt-3 bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 transition transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Delete Resume"}
                </button>
              </div>
            ) : (
              <p className="mb-4 text-gray-600 text-center">No resume uploaded yet.</p>
            )}

            <form
              onSubmit={uploadOrUpdateResume}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
            >
              <label className="cursor-pointer bg-purple-800 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-500 transition">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-black truncate max-w-[180px]">
                {resumeFile ? resumeFile.name : "No file chosen"}
              </span>
              <button
                type="submit"
                disabled={loading || !resumeFile}
                className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-lg shadow hover:bg-yellow-300 transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : user?.resume ? "Update Resume" : "Upload Resume"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-2/5 flex flex-col justify-center items-center text-center bg-white px-6 py-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="resumeimage.jpg"
            alt="Resume Illustration"
            className="mx-auto w-3/4 sm:w-2/3 max-w-xs mb-6 animate-bounce-slow"
          />
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-purple-700">
            Your Resume, Your Future
          </h3>
          <p className="text-gray-600 max-w-md text-sm sm:text-base">
            Upload, update, or delete your resume easily. Once uploaded, you can start applying to
            your dream jobs immediately.
          </p>
        </motion.div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4"
            onClick={handleOutsideClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-purple-700 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl text-white"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6 text-gray-200 text-sm sm:text-base">
                Are you sure you want to delete your resume? <br />
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={deleteResume}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={loading}
                  className="bg-gray-200 text-purple-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition transform hover:scale-105 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ResumePage;
