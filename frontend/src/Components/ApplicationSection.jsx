import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ApplicationSection = () => {
  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          Your <span className="text-indigo-600">Career</span> Starts Here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Explore thousands of opportunities, connect with top companies, and
          land your dream job. Employers can easily post jobs and find the
          perfect candidates.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <Link to="/jobs"className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Find Jobs
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationSection;
