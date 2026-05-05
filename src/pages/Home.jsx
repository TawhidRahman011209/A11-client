import { useEffect, useState } from "react";

import api from "../services/api";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const slides = [
    {
      title: "Garments Order Tracker",
      desc: "Manage garments products, customer orders, inventory, and production workflow seamlessly with our modern smart garments management platform.",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Production Management System",
      desc: "Manage garments products, customer orders, inventory, and production workflow seamlessly with our modern smart garments management platform.",
      img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Smart Inventory Solution",
      desc: "Manage garments products, customer orders, inventory, and production workflow seamlessly with our modern smart garments management platform.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const extendedSlides = [...slides, slides[0]];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    document.title = "Home | GarmentsPro";

    const fetchProducts = async () => {
      const res = await api.get("/api/products/home");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === slides.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [current]);

  return (
    <div className="bg-gradient-to-b from-base-100 via-base-200 to-base-100">

      <div className="relative h-[80vh] overflow-hidden">
        <motion.div
          animate={{ x: `-${current * 100}%` }}
          transition={
            isTransitioning
              ? { duration: 0.8, ease: "easeInOut" }
              : { duration: 0 }
          }
          className="flex h-full"
        >
          {extendedSlides.map((slide, i) => (
            <div
              key={i}
              className="w-full h-[80vh] flex-shrink-0 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black/60 w-full h-full flex items-center justify-center">
                <div className="hero-content text-neutral-content text-center">
                  <div className="max-w-3xl">
                    <h1 className="mb-6 text-5xl md:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mb-6 text-lg">
                      {slide.desc}
                    </p>

                    <Link
                      to="/products"
                      className="btn px-6 py-3 border-0 text-white 
                      bg-gradient-to-r from-indigo-600 to-purple-600 
                      hover:from-indigo-700 hover:to-purple-700 
                      rounded-xl shadow-lg text-lg font-semibold 
                      transition duration-300"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

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
                <h2 className="text-2xl font-bold">Choose Product</h2>
                <p>
                  Browse garments collections and choose
                  products that fit your fashion needs.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition duration-300">
              <div className="card-body items-center text-center py-10">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-2xl font-bold">Place Order</h2>
                <p>
                  Submit your booking and confirm your
                  garments production order instantly.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition duration-300">
              <div className="card-body items-center text-center py-10">
                <div className="text-5xl mb-4">🚚</div>
                <h2 className="text-2xl font-bold">Track Production</h2>
                <p>
                  Monitor real-time production status,
                  delivery updates, and order progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                smooth production tracking and easy order handling.
              </p>
              <h2 className="font-bold text-2xl mt-4">Sarah Khan</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-2xl p-6 rounded-3xl">
            <div className="card-body text-center">
              <div className="text-5xl mb-4">⭐</div>
              <p className="text-lg leading-relaxed">
                Very professional platform for garments factories.
              </p>
              <h2 className="font-bold text-2xl mt-4">Ahmed Rahman</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-2xl p-6 rounded-3xl">
            <div className="card-body text-center">
              <div className="text-5xl mb-4">⭐</div>
              <p className="text-lg leading-relaxed">
                Modern design and smooth ordering experience.
              </p>
              <h2 className="font-bold text-2xl mt-4">Nusrat Jahan</h2>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;