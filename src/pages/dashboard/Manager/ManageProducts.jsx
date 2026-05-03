import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

import api from "../../../services/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await api.get(
      "/api/products/manager/my-products"
    );

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
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        Manage Products
      </h2>

      <input
        type="text"
        placeholder="Search by name/category"
        className="input input-bordered mb-8 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>

              <th>Name</th>

              <th>Price</th>

              <th>Payment</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-16 h-16 rounded"
                  />
                </td>

                <td>{product.name}</td>

                <td>${product.price}</td>

                <td>{product.paymentOption}</td>

                <td className="flex gap-2">
                  <button className="btn btn-sm btn-primary">
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="btn btn-sm btn-error"
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
  );
};

export default ManageProducts;