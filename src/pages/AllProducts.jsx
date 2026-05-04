// src/pages/AllProducts.jsx

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
    <div>

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 pt-24 pb-32">

        <div className="max-w-7xl mx-auto px-5">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
              All Products
            </h2>

            <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto">
              Explore premium garments products designed with
              modern fashion trends, comfort, and quality
              materials for every customer.
            </p>
          </div>
        </div>
      </div>
      
      {/* PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-5 pt-52 pb-20">

        <div className="max-w-7xl mx-auto px-5 -mt-0 relative z-10">
        <input
          type="text"
          placeholder="Search by name/category"
          className="input input-bordered w-full h-16 text-lg rounded-3xl shadow-2xl bg-white"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
        </div>

        {/* EMPTY */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-base-content">
              No products found
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-base-300 hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/500"
                    }
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />

                  {/* PRICE */}
                  <div className="absolute top-5 right-5 bg-primary text-primary-content px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                    ${product.price}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">

                  {/* TITLE */}
                  <h2 className="text-4xl font-extrabold mb-4 text-base-content">
                    {product.name}
                  </h2>

                  {/* CATEGORY */}
                  <p className="text-base-content/70 text-lg mb-2">
                    Category: {product.category}
                  </p>

                  {/* QUANTITY */}
                  <p className="text-base-content/70 text-lg mb-6">
                    Available: {product.quantity}
                  </p>

                  {/* BUTTON */}
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-primary w-full rounded-2xl text-lg"
                  >
                    View Details
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center flex-wrap gap-4 mt-16">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn px-6 ${
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
    </div>
  );
};

export default AllProducts;