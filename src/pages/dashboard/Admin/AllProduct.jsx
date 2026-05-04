import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../../../services/api";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    document.title = "All Products";
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      await api.delete(`/api/products/${id}`);
      toast.success("Deleted");
      fetchProducts();
    }
  };

  const toggleHome = async (id, currentValue) => {
    await api.patch(`/api/products/${id}`, {
      showOnHome: !currentValue,
    });

    toast.success("Updated");
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6 rounded-3xl shadow-inner">
      
      <h2 className="text-4xl font-bold mb-8">
        All Products
      </h2>

      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            
            <thead className="text-black">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show on Home</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover">
                  
                  <td>
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl border"
                    />
                  </td>

                  <td className="font-semibold">
                    {product.name}
                  </td>

                  <td>${product.price}</td>

                  <td>
                    <span className="px-3 py-1 text-sm rounded-full bg-base-200">
                      {product.category}
                    </span>
                  </td>

                  <td className="text-sm opacity-70">
                    {product.createdBy}
                  </td>

                  {/* SHOW HOME */}
                  <td>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={product.showOnHome}
                        onChange={() =>
                          toggleHome(product._id, product.showOnHome)
                        }
                      />

                      <span
                        className={`text-sm font-semibold ${
                          product.showOnHome
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {product.showOnHome ? "ON" : "OFF"}
                      </span>
                    </div>
                  </td>

                  {/* ✅ ACTIONS */}
                  <td className="flex gap-2">
                    
                    {/* 🔵 UPDATE BUTTON */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-product/${product._id}`)
                      }
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md"
                    >
                      Update
                    </button>

                    {/* 🔴 DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none shadow-md"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default AllProduct;