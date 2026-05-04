import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../../../services/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/api/products/manager/my-products");
    setProducts(res.data);
  };

  useEffect(() => {
    document.title = "Manage Products";
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      await api.delete(`/api/products/${id}`);
      toast.success("Product Deleted");
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pl-4"> {/* 👉 move everything slightly RIGHT */}

      <h2 className="text-4xl font-bold mb-8">Manage Products</h2>

      <input
        type="text"
        placeholder="Search by name/category"
        className="input input-bordered mb-8 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          {/* 👆 THIS creates space between rows */}

          <thead>
            <tr className="text-left">
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="bg-white shadow-sm rounded-xl"
              >
                {/* 👆 each row looks like a card */}

                <td className="rounded-l-xl">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-16 h-16 rounded"
                  />
                </td>

                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.paymentOption}</td>

                <td className="flex gap-3 rounded-r-xl">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/update-product/${product._id}`)
                    }
                    className="px-3 py-1 rounded-lg text-white text-sm font-semibold 
                    bg-blue-500 hover:bg-blue-600 active:scale-95 transition shadow-md"
                  >
                    ✏️ Update
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 rounded-lg text-white text-sm font-semibold 
                    bg-red-500 hover:bg-red-600 active:scale-95 transition shadow-md"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;