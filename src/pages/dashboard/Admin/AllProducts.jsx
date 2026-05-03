import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Swal from "sweetalert2";

import api from "../../../services/api";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

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
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      await api.delete(`/api/products/${id}`);

      toast.success("Deleted");

      fetchProducts();
    }
  };

  const toggleHome = async (
    id,
    currentValue
  ) => {
    await api.patch(`/api/products/${id}`, {
      showOnHome: !currentValue,
    });

    toast.success("Updated");

    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        All Products
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>

              <th>Name</th>

              <th>Price</th>

              <th>Category</th>

              <th>Created By</th>

              <th>Show Home</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
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

                <td>{product.category}</td>

                <td>{product.createdBy}</td>

                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={product.showOnHome}
                    onChange={() =>
                      toggleHome(
                        product._id,
                        product.showOnHome
                      )
                    }
                  />
                </td>

                <td>
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

export default AllProduct;