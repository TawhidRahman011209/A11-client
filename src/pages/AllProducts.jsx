import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {products.map(p => (
        <div key={p._id} className="border p-4 rounded">
          <img src={p.images[0]} alt="" />
          <h2 className="font-bold">{p.name}</h2>
          <p>{p.category}</p>
          <p>${p.price}</p>
          <p>Stock: {p.quantity}</p>

          <Link to={`/product/${p._id}`} className="btn">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;