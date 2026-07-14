import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customer from "../services/customerApi";

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
    }
  };

  useEffect(() => {
    getCustomerById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customer.put(`/update/${id}`, formData);

      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Update Customer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;