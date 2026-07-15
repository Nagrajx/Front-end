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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">

      <h2 className="text-2xl font-bold mb-5">
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
          className="w-full border p-2 rounded"
          required
        />


        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />


        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />


        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />


        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>

      </form>

    </div>
  );
};

export default AddEmployee;