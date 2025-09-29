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
  const API = import.meta.env.VITE_API_URL;

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
    <><div className="min-h-screen flex">
      <div className="bg-gray-100 w-4/6 min-h-screen rounded-br-full flex items-center justify-center">
        <motion.div
          className="p-6 text-white w-full max-w-md -mt-52"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl text-black font-bold mb-4">Manage <span className="text-2xl text-blue-500">Resume</span></h2>

          {user.resume ? (
            <div className="mb-4 text-black">
              <p>
                Current Resume:{" "}
                <a
                  href={user.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  View Resume
                </a>
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
                className="mt-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 transition transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Delete Resume"}
              </button>
            </div>
          ) : (
            <p className="mb-4 text-gray-200">No resume uploaded yet.</p>
          )}

          <form onSubmit={uploadOrUpdateResume} className="flex items-center mt-4 gap-3 flex-wrap">
            <label className="cursor-pointer bg-purple-800 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-500 transition">
              Choose File
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden" />
            </label>
            <span className="text-sm text-black truncate max-w-[140px]">
              {resumeFile ? resumeFile.name : "No file chosen"}
            </span>
            <button
              type="submit"
              disabled={loading || !resumeFile}
              className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : user.resume ? "Update Resume" : "Upload Resume"}
            </button>
          </form>
        </motion.div>
      </div>
      <motion.div
        className="w-3/5 flex flex-col justify-center items-center text-center bg-white px-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="resumeimage.jpg"
          alt="Resume Illustration"
          className="mx-auto max-w-sm mb-4 animate-bounce-slow" />
        <h3 className="text-5xl font-bold mb-2 text-purple-700">Your Resume, Your Future</h3>
        <p className="text-gray-600 max-w-md">
          Upload, update, or delete your resume easily. Once uploaded, you can start applying to
          your dream jobs immediately.
        </p>
      </motion.div>
      {showDeleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
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
            <p className="mb-6 text-gray-200">
              Are you sure you want to delete your resume? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
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
    </div><div>
        <Footer />
      </div></>
      
  );
};

export default ResumePage;
