import { useState } from "react";

const AuthForm = ({ onSubmit, type }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === "login" ? "Login to JobsAI" : "Register at JobsAI"}
      </h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full mb-3 p-3 border rounded-lg"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-3 p-3 border rounded-lg"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
