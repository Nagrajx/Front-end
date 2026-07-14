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
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Employees
        </h1>


        <button
          onClick={() => navigate("/employee/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>

      </div>



      <div className="bg-white shadow rounded-lg overflow-x-auto">

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
                  className="border-b"
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


                  <td className="p-3 flex gap-2 justify-center">

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