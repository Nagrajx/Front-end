import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import employee from "../services/employeeApi";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployees = async () => {
    try {
      const response = await employee.get("/all");
      setEmployees(response.data.employees);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch employees"
      );
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await employee.delete(
        `/delete/${id}`
      );

      toast.success(
        response.data.message ||
          "Employee Deleted"
      );

      getEmployees();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Employees
        </h1>

        <button
          onClick={() => navigate("/employee/add")}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {employees.length > 0 ? (
          employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h2 className="text-lg font-semibold mb-2">
                {emp.name}
              </h2>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">
                    Email:
                  </span>{" "}
                  {emp.email}
                </p>

                <p>
                  <span className="font-medium">
                    Mobile:
                  </span>{" "}
                  {emp.mobile}
                </p>

                <p>
                  <span className="font-medium">
                    Department:
                  </span>{" "}
                  {emp.department}
                </p>

                <p>
                  <span className="font-medium">
                    Designation:
                  </span>{" "}
                  {emp.designation}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/employee/edit/${emp._id}`
                    )
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEmployee(emp._id)
                  }
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-5 rounded-lg text-center">
            No Employees Found
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">
                Name
              </th>
              <th className="p-3 text-left">
                Email
              </th>
              <th className="p-3 text-left">
                Mobile
              </th>
              <th className="p-3 text-left">
                Department
              </th>
              <th className="p-3 text-left">
                Designation
              </th>
              <th className="p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {emp.name}
                  </td>

                  <td className="p-3">
                    {emp.email}
                  </td>

                  <td className="p-3">
                    {emp.mobile}
                  </td>

                  <td className="p-3">
                    {emp.department}
                  </td>

                  <td className="p-3">
                    {emp.designation}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/employee/edit/${emp._id}`
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteEmployee(emp._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-5"
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EmployeeList;