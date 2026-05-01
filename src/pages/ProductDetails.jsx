import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dbUser } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const canOrder =
    dbUser?.role === "buyer" &&
    dbUser?.status !== "suspended";

  return (
    <div className="p-6 space-y-4">
      <img src={product.images[0]} alt="" />

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Available: {product.quantity}</p>
      <p>Min Order: {product.minOrder}</p>

      {canOrder && (
        <a
          href={`/booking/${product._id}`}
          className="btn"
        >
          Order Now
        </a>
      )}
    </div>
  );
};

export default ProductDetails;