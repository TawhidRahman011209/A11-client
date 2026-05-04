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

  if (loading) return <Loader />;
  if (!product) return <p>No product found</p>;

  const canOrder =
    user &&
    dbUser?.role === "buyer" &&
    dbUser?.status !== "suspended";

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* LEFT SIDE */}
        <div>
          {/* MAIN IMAGE */}
          <img
            src={product.images?.[0] || "https://via.placeholder.com/500"}
            className="rounded-xl w-full mb-4"
          />

          {/* MULTIPLE IMAGES */}
          <div className="grid grid-cols-3 gap-3">
            {product.images?.map((img, i) => (
              <img key={i} src={img} className="rounded-lg" />
            ))}
          </div>

          {/* DEMO VIDEO */}
          {product.demoVideo && (
            <iframe
              src={product.demoVideo}
              className="w-full h-64 rounded-xl mt-5"
              allowFullScreen
              title="Demo Video"
            ></iframe>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-5">
            {product.name}
          </h2>

          <p className="mb-5">{product.description}</p>

          <div className="space-y-3">
            <p><b>Category:</b> {product.category}</p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Available:</b> {product.quantity}</p>
            <p><b>Minimum Order:</b> {product.moq}</p>
            <p><b>Payment:</b> {product.paymentOption}</p>
          </div>

          {canOrder ? (
            <Link
              to={`/booking/${product._id}`}
              className="btn btn-primary mt-8"
            >
              Order Now
            </Link>
          ) : (
            <button className="btn btn-disabled mt-8">
              Buyers Only
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;