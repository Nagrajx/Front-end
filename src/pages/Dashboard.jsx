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
      const employeeResponse = await employee.get("/employee/all");
      const customerResponse = await customer.get("customer/all");


      setTotalEmployees(employeeResponse.data.count);

      setTotalCustomers(customerResponse.data.count);


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
      const response = await api.post("/auth/logout");

      console.log(response.data);

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
      <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Employee Management System
        </h1>


        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>



      {/* Welcome Section */}
      <div className="p-8">

        <div className="bg-white shadow rounded-lg p-6">

          <h2 className="text-3xl font-bold mb-2">
            Welcome {user?.name || "User"} 👋
          </h2>


          <p className="text-gray-600">
            Manage Employees and Customers from one dashboard.
          </p>

        </div>

      </div>




      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">


        <div className="bg-white shadow rounded-lg p-6">

          <h3 className="text-lg font-semibold">
            Employees
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {totalEmployees}
          </p>

        </div>



        <div className="bg-white shadow rounded-lg p-6">

          <h3 className="text-lg font-semibold">
            Customers
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {totalCustomers}
          </p>

        </div>



        <div className="bg-white shadow rounded-lg p-6">

          <h3 className="text-lg font-semibold">
            Status
          </h3>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            Active
          </p>

        </div>


      </div>





      {/* Quick Actions */}
      <div className="p-8">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>


        <div className="flex gap-4 flex-wrap">


          <button
            onClick={() => navigate("/employees")}
            className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
          >
            Employees
          </button>



          <button
            onClick={() => navigate("/customers")}
            className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
          >
            Customers
          </button>



          <button
            onClick={() => navigate("/employee/add")}
            className="bg-purple-600 text-white px-5 py-3 rounded hover:bg-purple-700"
          >
            Add Employee
          </button>



          <button
            onClick={() => navigate("/customer/add")}
            className="bg-orange-600 text-white px-5 py-3 rounded hover:bg-orange-700"
          >
            Add Customer
          </button>


        </div>

      </div>


    </div>
  );
};


export default Dashboard;