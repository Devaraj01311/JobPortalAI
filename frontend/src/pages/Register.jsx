import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/register`, form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10 bg-gray-50">
        <form
          className="w-full max-w-sm bg-white p-6 md:p-8 rounded-xl shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center md:text-left">
            Create New Account
          </h2>

          <input
            name="name"
            placeholder="Enter Your Full Name"
            value={form.name}
            onChange={handleChange}
            className="border-b-2 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <input
            name="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            className="border-b-2 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border-b-2 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white p-3 w-full font-semibold rounded hover:bg-blue-800 transition-all"
          >
            Register
          </button>
          <p className="text-center mt-4 text-sm">
            <Link to="/login" className="text-blue-800 font-medium hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section - Info Panel */}
      <div className="relative w-full md:w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center p-8 md:p-10 rounded-t-[60px] md:rounded-t-none md:rounded-bl-full">
        <h2 className="text-3xl font-serif mb-4 text-center md:text-left">
          Already have an account?
        </h2>
        <p className="text-center mb-6 max-w-xs text-sm md:text-base leading-relaxed">
          Start your journey towards success by discovering opportunities tailored to your strengths{" "}
          <span className="font-bold text-xl">✨</span>
        </p>
        <Link
          to="/login"
          className="bg-white text-blue-900 px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
