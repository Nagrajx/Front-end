import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import employee from "../services/employeeApi";
import customer from "../services/customerApi";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Satish",
  });

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // Get Dashboard Stats
  const getStats = async () => {
    try {
      const employeeResponse = await employee.get("/all");
      const customerResponse = await customer.get("/all");

      setTotalEmployees(
        employeeResponse.data.count ||
          employeeResponse.data.employees?.length ||
          0
      );

      setTotalCustomers(
        customerResponse.data.count ||
          customerResponse.data.customers?.length ||
          0
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load dashboard data"
      );
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      toast.success("Logout Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Logout Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white px-4 sm:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Employee Management System
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Welcome Section */}
      <div className="p-4 sm:p-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome {user?.name || "User"} 👋
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            Manage Employees and Customers from one dashboard.
          </p>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Employees
          </h3>

          <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Customers
          </h3>

          <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
            {totalCustomers}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold">
            Status
          </h3>

          <p className="text-3xl sm:text-4xl font-bold text-purple-600 mt-2">
            Active
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="p-4 sm:p-8">

        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <button
            onClick={() => navigate("/employees")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Employees
          </button>

          <button
            onClick={() => navigate("/customers")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Customers
          </button>

          <button
            onClick={() => navigate("/employee/add")}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Add Employee
          </button>

          <button
            onClick={() => navigate("/customer/add")}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Add Customer
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;