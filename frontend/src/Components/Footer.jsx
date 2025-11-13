import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
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
    <footer className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-10 relative mt-6 rounded-tl-3xl rounded-tr-3xl">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-10">
        
        {/* --- About --- */}
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">JobPortal AI</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Your one-stop platform for finding the best jobs and automatically
            applying to them. Manage your applications efficiently with
            AI-powered tools.
          </p>
        </div>

        {/* --- Links --- */}
        <div className="md:w-1/3 flex flex-col sm:flex-row justify-center md:justify-between gap-8 text-center sm:text-left">
          <div>
            <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-yellow-400 transition">Jobs</a></li>
              <li><a href="/applications" className="hover:text-yellow-400 transition">My Applications</a></li>
              <li><a href="/resume" className="hover:text-yellow-400 transition">Upload Resume</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* --- Social --- */}
        <div className="md:w-1/3 text-center md:text-right">
          <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-400 transition text-white"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* --- Copyright --- */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/90">
        &copy; {new Date().getFullYear()} <span className="font-semibold">JobPortal AI</span>. All rights reserved.
      </div>

      {/* --- Scroll to Top Button --- */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-yellow-400 text-blue-900 hover:bg-yellow-500 shadow-lg transition z-50"
          aria-label="Go to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
