import { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import api from "../services/api";

import Loader from "../components/shared/Loader";

import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    document.title = "Product Details";

    const fetchData = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);

        setProduct(res.data);

        if (user?.email) {
          const userRes = await api.get("/api/users/me");

          setDbUser(userRes.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <div className="grid lg:grid-cols-2 gap-10">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/500"}
          alt=""
          className="rounded-xl w-full"
        />

        <div>
          <h2 className="text-4xl font-bold mb-5">
            {product.name}
          </h2>

          <p className="mb-5">
            {product.description}
          </p>

          <div className="space-y-3">
            <p>
              <span className="font-bold">
                Category:
              </span>{" "}
              {product.category}
            </p>

            <p>
              <span className="font-bold">
                Price:
              </span>{" "}
              ${product.price}
            </p>

            <p>
              <span className="font-bold">
                Available Quantity:
              </span>{" "}
              {product.quantity}
            </p>

            <p>
              <span className="font-bold">
                Minimum Order:
              </span>{" "}
              {product.moq}
            </p>

            <p>
              <span className="font-bold">
                Payment:
              </span>{" "}
              {product.paymentOption}
            </p>
          </div>

          {dbUser?.role === "buyer" &&
          dbUser?.status !== "suspended" ? (
            <Link
              to={`/booking/${product._id}`}
              className="btn btn-primary mt-8"
            >
              Order Now
            </Link>
          ) : (
            <button
              disabled
              className="btn btn-disabled mt-8"
            >
              Buyers Only
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;