import { useState } from "react";
import { useNavigate } from "react-router-dom";
import employee from "../services/employeeApi";
import toast from "react-hot-toast";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
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
      const response = await employee.post(
        "/add",
        formData
      );

      toast.success(
        response.data.message ||
          "Employee Added Successfully"
      );

      navigate("/employees");
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add employee"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Add Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Employee Email"
            value={formData.email}
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
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Employee
          </button>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Employees
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddEmployee;