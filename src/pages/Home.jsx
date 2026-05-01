import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

const Home = () => {
  const { products, loading } = useProducts();

  const homeProducts = products
    .filter(p => p.showOnHome)
    .slice(0, 6);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-10">

      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold">
          Garments Production System
        </h1>
        <p>Manage orders & production easily</p>
        <Link to="/products" className="btn mt-4">
          View Products
        </Link>
      </section>

      {/* Products */}
      <section className="grid md:grid-cols-3 gap-6">
        {homeProducts.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <img src={p.images[0]} alt="" />
            <h2 className="font-bold">{p.name}</h2>
            <p>${p.price}</p>
            <Link to={`/product/${p._id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Home;