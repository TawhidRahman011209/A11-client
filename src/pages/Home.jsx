import { useEffect, useState } from "react";

import api from "../services/api";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Home | GarmentsPro";

    const fetchProducts = async () => {
      const res = await api.get("/api/products/home");

      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div
        className="hero min-h-[80vh]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/7NZ2w6z/garments.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>

        <div className="hero-content text-neutral-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="mb-5 text-5xl font-bold">
              Garments Order & Production Tracker
            </h1>

            <p className="mb-5">
              Manage products, orders, and production
              workflow seamlessly with our modern
              garments management system.
            </p>

            <Link to="/products" className="btn btn-primary">
              View Products
            </Link>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-5 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
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

                <p>
                  {product.description.slice(0, 80)}...
                </p>

                <p className="font-bold text-primary">
                  ${product.price}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold">
                  1. Choose Product
                </h2>

                <p>
                  Browse garments and choose your desired
                  product.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold">
                  2. Place Order
                </h2>

                <p>
                  Complete booking form and confirm order.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold">
                  3. Track Production
                </h2>

                <p>
                  Monitor real-time production and delivery
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">
          Customer Feedback
        </h2>

        <div className="carousel w-full max-w-4xl mx-auto rounded-box">
          <div className="carousel-item w-full">
            <div className="card bg-base-200 w-full">
              <div className="card-body text-center">
                <p>
                  Excellent garments management system with
                  smooth production tracking.
                </p>

                <h2 className="font-bold text-xl">
                  - Sarah Khan
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;