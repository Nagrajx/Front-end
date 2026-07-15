import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      toast.success(response.data.message || "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-5 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;