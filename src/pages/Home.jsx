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
    <div className="bg-gradient-to-b from-base-100 via-base-200 to-base-100">

      {/* HERO SECTION */}
      <div
        className="hero min-h-[80vh]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2070&auto=format&fit=crop)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>

        <div className="hero-content text-neutral-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-5xl md:text-6xl font-bold leading-tight">
              Garments Order & Production Tracker
            </h1>

            <p className="mb-6 text-lg">
              Manage garments products, customer orders,
              inventory, and production workflow seamlessly
              with our modern smart garments management
              platform.
            </p>

            <Link
              to="/products"
              className="btn btn-primary btn-lg"
            >
              View Products
            </Link>
          </motion.div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="py-24 px-5 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Our Products
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-14 text-lg opacity-80">
          Explore premium garments products designed with
          modern fashion trends, comfort, and quality
          materials for every customer.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group rounded-3xl overflow-hidden bg-base-100 shadow-2xl hover:shadow-primary/30 transition-all duration-300 border border-base-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt=""
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-semibold shadow-lg">
                  ${product.price}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-3xl font-bold">
                  {product.name}
                </h2>

                <p className="text-base opacity-80 leading-relaxed">
                  {product.description?.slice(0, 100) || "No description available"}...
                </p>

                <div className="pt-3">
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-primary w-full rounded-xl text-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-5xl font-bold text-center mb-4">
            How It Works
          </h2>

          <p className="text-center max-w-2xl mx-auto mb-14 text-lg opacity-80">
            Our smart workflow system helps customers and
            factories manage garments orders quickly and
            efficiently.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition duration-300">
              <div className="card-body items-center text-center py-10">
                <div className="text-5xl mb-4">🛍️</div>

                <h2 className="text-2xl font-bold">
                  Choose Product
                </h2>

                <p>
                  Browse garments collections and choose
                  products that fit your fashion needs.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition duration-300">
              <div className="card-body items-center text-center py-10">
                <div className="text-5xl mb-4">📦</div>

                <h2 className="text-2xl font-bold">
                  Place Order
                </h2>

                <p>
                  Submit your booking and confirm your
                  garments production order instantly.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition duration-300">
              <div className="card-body items-center text-center py-10">
                <div className="text-5xl mb-4">🚚</div>

                <h2 className="text-2xl font-bold">
                  Track Production
                </h2>

                <p>
                  Monitor real-time production status,
                  delivery updates, and order progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK */}
      <section className="py-24 px-5 bg-gradient-to-r from-base-200 to-base-100">
        <h2 className="text-5xl font-bold text-center mb-4">
          Customer Feedback
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-14 text-lg opacity-80">
          Trusted by fashion businesses, buyers, and
          garment factories for smooth production tracking
          and modern order management.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          <div className="card bg-base-100 shadow-2xl p-6 rounded-3xl">
            <div className="card-body text-center">
              <div className="text-5xl mb-4">⭐</div>

              <p className="text-lg leading-relaxed">
                Excellent garments management system with
                smooth production tracking and easy order
                handling.
              </p>

              <h2 className="font-bold text-2xl mt-4">
                Sarah Khan
              </h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-2xl p-6 rounded-3xl">
            <div className="card-body text-center">
              <div className="text-5xl mb-4">⭐</div>

              <p className="text-lg leading-relaxed">
                Very professional platform for garments
                factories. The tracking system saves a lot
                of production time.
              </p>

              <h2 className="font-bold text-2xl mt-4">
                Ahmed Rahman
              </h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-2xl p-6 rounded-3xl">
            <div className="card-body text-center">
              <div className="text-5xl mb-4">⭐</div>

              <p className="text-lg leading-relaxed">
                Modern design, easy dashboard, and smooth
                ordering experience. Highly recommended.
              </p>

              <h2 className="font-bold text-2xl mt-4">
                Nusrat Jahan
              </h2>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;