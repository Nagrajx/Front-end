import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from "../services/customerApi";
import toast from "react-hot-toast";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customer.post(
        "/add",
        formData
      );

      toast.success(
        response.data.message ||
          "Customer Added Successfully"
      );

      navigate("/customers");
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add customer"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Add Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Customer
          </button>

          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Customers
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddCustomer;