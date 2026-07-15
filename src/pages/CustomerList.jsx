import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from "../services/customerApi";
import toast from "react-hot-toast";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const getCustomers = async () => {
    try {
      const response = await customer.get("/all");

      setCustomers(response.data.customers);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customer.delete(`/delete/${id}`);

      setCustomers((prev) =>
        prev.filter(
          (customer) => customer._id !== id
        )
      );

      toast.success("Customer Deleted");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        <h1 className="text-2xl sm:text-3xl font-bold">
          Customers
        </h1>

        <button
          onClick={() => navigate("/customer/add")}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Customer
        </button>

      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {customers.length > 0 ? (
          customers.map((customerItem) => (
            <div
              key={customerItem._id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h2 className="text-lg font-semibold mb-2">
                {customerItem.name}
              </h2>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">
                    Email:
                  </span>{" "}
                  {customerItem.email}
                </p>

                <p>
                  <span className="font-medium">
                    Phone:
                  </span>{" "}
                  {customerItem.phone}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/customer/edit/${customerItem._id}`
                    )
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCustomer(customerItem._id)
                  }
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-5 rounded-lg text-center">
            No Customers Found
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customerItem) => (
                <tr
                  key={customerItem._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {customerItem.name}
                  </td>

                  <td className="p-4">
                    {customerItem.email}
                  </td>

                  <td className="p-4">
                    {customerItem.phone}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/customer/edit/${customerItem._id}`
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCustomer(customerItem._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
                  colSpan="4"
                  className="text-center p-5"
                >
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CustomerList;