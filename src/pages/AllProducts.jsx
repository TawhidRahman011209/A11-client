import { useState } from "react";

import { Link } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import Loader from "../components/shared/Loader";

const AllProducts = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const { products, loading, totalPages } =
    useProducts(page, search);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      <h2 className="text-4xl font-bold text-center mb-10">
        All Products
      </h2>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search by name/category"
          className="input input-bordered w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={product.images[0]}
                alt=""
                className="h-64 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {product.name}
              </h2>

              <p>Category: {product.category}</p>

              <p>Price: ${product.price}</p>

              <p>Available: {product.quantity}</p>

              <div className="card-actions justify-end">
                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn ${
              page === num + 1
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;