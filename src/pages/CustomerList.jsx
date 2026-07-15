import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from "../services/customerApi";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const getCustomers = async () => {
    try {
      const response = await customer.get("/all");

      setCustomers(response.data.customers);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customer.delete(`/delete/${id}`);

      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Customers</h1>

        <button
          onClick={() => navigate("/customer/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Customer
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customerItem) => (
                <tr
                  key={customerItem._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {customerItem.name}
                  </td>

                  <td className="p-3">
                    {customerItem.email}
                  </td>

                  <td className="p-3">
                    {customerItem.phone}
                  </td>

                  <td className="p-3 flex justify-center gap-2">
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