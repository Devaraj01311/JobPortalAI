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
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center p-10">
        <form className="w-full max-w-sm bg-white p-8 rounded " onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-blue-900 text-left">Create New Account</h2>
          
          <input
            name="name"
            placeholder="Enter Your Fullname"
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
          <button type="submit" className="bg-blue-900 text-white p-3 w-full font-semibold rounded hover:bg-blue-800">
            Register
          </button>
          <p className="text-center mt-4">
            <Link to="/login" className="text-blue-800 font-medium hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </form>
      </div>
      <div className="w-2/3 bg-blue-900 text-white flex flex-col justify-center items-center p-10 relative rounded-bl-full">
        <h2 className="text-3xl font-serif mb-4">Already have an account?</h2>
        <p className="text-center mb-6 max-w-xs">
       <span className="font-bold text-3xl"></span>Start your journey towards success by discovering opportunities tailored to your strengths <span className="font-bold text-1xl">✨</span>
        </p>
        <Link to="/login" className="bg-white  text-blue-900 px-9 py-2 rounded-full font-semibold hover:bg-gray-200">
          Login
        </Link>
        <img src="image.jpg" alt="Rocket" className="w-48 h-48 absolute bottom-0  -left-12 rounded-tr-3xl" />
      </div>


    </div>
  );
};

export default Register;
