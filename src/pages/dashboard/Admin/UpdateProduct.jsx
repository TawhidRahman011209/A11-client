import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // 🔹 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setFormData({
          name: res.data.name || "",
          price: res.data.price || "",
          category: res.data.category || "",
          description: res.data.description || "",
        });
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/api/products/${id}`, formData);
      toast.success("Product updated successfully");
      navigate("/dashboard/all-products");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6">
    
    {/* CARD */}
    <div className="w-full max-w-xl bg-base-100 rounded-3xl shadow-2xl border border-base-300 p-8">

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-center mb-2">
        Update Product
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Edit product details and save changes
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* FIELD BOX */}
        <div className="bg-base-200 rounded-2xl p-4">
          <label className="block mb-2 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full rounded-xl"
            required
          />
        </div>

        <div className="bg-base-200 rounded-2xl p-4">
          <label className="block mb-2 font-semibold">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full rounded-xl"
            required
          />
        </div>

        <div className="bg-base-200 rounded-2xl p-4">
          <label className="block mb-2 font-semibold">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full rounded-xl"
            required
          />
        </div>

        <div className="bg-base-200 rounded-2xl p-4">
          <label className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="textarea textarea-bordered w-full rounded-xl"
            required
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">

          {/* SAVE */}
          <button
            type="submit"
            className="w-1/2 py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-indigo-500 to-purple-600 
            hover:scale-105 transition duration-300 shadow-lg"
          >
            💾 Save Changes
          </button>

          {/* CANCEL */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 py-3 rounded-xl font-semibold 
            bg-base-200 hover:bg-base-300 transition"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  </div>
 );
};

export default UpdateProduct;