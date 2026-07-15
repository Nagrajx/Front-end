import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customer from "../services/customerApi";
import toast from "react-hot-toast";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getCustomerById = async () => {
    try {
      const response = await customer.get(`/get/${id}`);

      setFormData({
        name: response.data.customer.name,
        email: response.data.customer.email,
        phone: response.data.customer.phone,
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch customer"
      );
    }
  };

  useEffect(() => {
    getCustomerById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customer.put(`/update/${id}`, formData);

      toast.success("Customer Updated Successfully");

      navigate("/customers");
    } catch (error) {
      console.log(error);

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
          Update Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Update Customer
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

export default EditCustomer;