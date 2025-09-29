
import React from "react";
import {
  FaRobot,
  FaFileAlt,
  FaShieldAlt,
  FaBriefcase,
  FaBookmark,
  FaChartLine,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="text-center py-12">
        <p className="text-sm text-purple-500 font-medium">Smart Hiring with AI</p>
        <h2 className="text-3xl font-bold mt-2">Why Use Our Job Portal?</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {[
          {
            icon: <FaRobot className="text-purple-500 text-4xl mx-auto mb-4" />,
            title: "AI Job Matching",
            desc: "Get personalized job suggestions powered by artificial intelligence.",
          },
          {
            icon: <FaFileAlt className="text-purple-500 text-4xl mx-auto mb-4" />,
            title: "Smart Resume Builder",
            desc: "Build professional resumes that stand out to recruiters.",
          },
          {
            icon: <FaShieldAlt className="text-purple-500 text-4xl mx-auto mb-4" />,
            title: "Verified Employers",
            desc: "Apply only to trusted and verified companies.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-tr hover:from-purple-50 hover:to-pink-50"
          >
            {item.icon}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center py-16 px-6">
        <div>
          <h4 className="text-sm uppercase text-purple-500 font-medium">
            Smart Job Recommendations
          </h4>
          <h2 className="text-2xl font-bold mt-2">
            Find the Right Job Faster with AI
          </h2>
          <p className="text-gray-600 mt-4">
            Our AI-powered engine analyzes your skills, experience, and preferences
            to recommend the most suitable jobs for you — saving time and boosting
            success.
          </p>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg group">
          <img
            src="https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-1508.jpg"
            alt="AI Job Matching"
            className="w-full object-cover transform transition duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 opacity-20"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-16">
        {[
          {
            icon: <FaBriefcase className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Latest Jobs",
            desc: "Browse thousands of fresh job postings updated daily.",
          },
          {
            icon: <FaBookmark className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Saved Jobs",
            desc: "Bookmark jobs you like and apply when you’re ready.",
          },
          {
            icon: <FaChartLine className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Application Tracking",
            desc: "Stay updated on every stage of your application process.",
          },
          {
            icon: <FaRobot className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Career Guidance",
            desc: "Get AI-powered career advice and skill recommendations.",
          },
          {
            icon: <FaFileAlt className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Affordable Premium",
            desc: "Unlock advanced tools with low-cost premium plans.",
          },
          {
            icon: <FaShieldAlt className="text-purple-500 text-3xl mx-auto mb-3" />,
            title: "Skill Assessments",
            desc: "Test and showcase your skills to employers directly.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-tr hover:from-purple-50 hover:to-pink-50"
          >
            {item.icon}
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
