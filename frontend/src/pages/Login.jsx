import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      login(res.data.user, res.data.token);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 rounded-br-full bg-purple-500 text-white flex flex-col justify-center items-center p-10 relative">
        <h2 className="text-3xl font-serif  mb-4">New here?</h2>
        <p className="text-center mb-6 max-w-xs">
          Welcome! Unlock new career paths, grow your expertise, and achieve your goals with the guidance and support you need
        </p>
        <Link to="/register" className="bg-white text-purple-500 px-6 py-2 font-semibold rounded-full hover:bg-gray-200">
          Sign Up
        </Link>
        <img src="jobimage.png" alt="Rocket" className="w-48 h-56 absolute bottom-1 -right-11 rounded-tl-full" />
      </div>
      <div className="w-2/4 flex justify-center items-center p-1">
        <form className="w-full max-w-sm bg-white p-8 rounded " onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-left">Sign in</h2>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border-b-2 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border-b-2 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="bg-purple-500 text-white font-semibold p-3 w-full rounded hover:bg-purple-700">
            Login
          </button>
          <p className="text-center mt-4">
            <Link to="/forgot-password" className="text-purple-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
