import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-10 relative mt-4 rounded-tl-3xl rounded-tr-3xl">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold text-white mb-4">JobPortal AI</h2>
          <p className="text-white font-sans">
            Your one-stop platform for finding the best jobs and automatically applying to them. Manage your applications efficiently with AI-powered tools.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-between">
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-yellow-400 transition">Jobs</a></li>
              <li><a href="/applications" className="hover:text-yellow-400 transition">My Applications</a></li>
              <li><a href="/resume" className="hover:text-yellow-400 transition">Upload Resume</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/3">
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"><FaTwitter /></a>
            <a href="https://x.com/" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"><FaLinkedinIn /></a>
            <a href="https://github.com/" className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-10 pt-6 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} JobPortal AI. All rights reserved.
      </div>
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-yellow-400 text-blue-900 hover:bg-yellow-500 shadow-lg transition"
          aria-label="Go to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
