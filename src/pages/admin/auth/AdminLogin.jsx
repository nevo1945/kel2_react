import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", formData.username)
      .eq("email", formData.email)
      .eq("password", formData.password)
      .maybeSingle();

    if (data && !error) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      navigate("/admin/auth/not-found");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8e6] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-[#f3e6ca]">
        {/* Back Button with Icon */}
        <div className="mb-6 flex items-center justify-start">
          <Link to="/" className="text-[#d3932d] font-semibold flex items-center hover:underline">
            <span className="text-xl mr-2">🏋️‍♂️</span> Back to TrainingHub
          </Link>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-[#d3932d] drop-shadow-sm">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm">Welcome back, please login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#fffdf5] border-[#f3e6ca] focus:outline-none focus:ring-2 focus:ring-[#d3932d]"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#fffdf5] border-[#f3e6ca] focus:outline-none focus:ring-2 focus:ring-[#d3932d]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#fffdf5] border-[#f3e6ca] focus:outline-none focus:ring-2 focus:ring-[#d3932d]"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#d3932d] hover:bg-[#b97d1c] text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
