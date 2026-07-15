import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employee from "../services/employeeApi";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
  });

  // Get Employee By Id
  const getEmployee = async () => {
    try {
      const response = await employee.get(`/get/${id}`);

      const emp = response.data.employee;

      setFormData({
        name: emp.name,
        email: emp.email,
        mobile: emp.mobile,
        department: emp.department,
        designation: emp.designation,
      });
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Failed to load employee"
      );
    }
  };

  useEffect(() => {
    getEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await employee.patch(
        `/update/${id}`,
        formData
      );

      toast.success(
        response.data.message ||
          "Employee Updated Successfully"
      );

      navigate("/employees");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Edit Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
          />

          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Update Employee
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

export default EditEmployee;