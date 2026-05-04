import {
  FaShippingFast,
  FaTshirt,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen">

      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About GarmentsPro
            </h1>

            <p className="text-lg md:text-xl leading-relaxed">
              GarmentsPro is a smart garments management
              platform designed to simplify product
              ordering, production tracking, and delivery
              management for factories and buyers.
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-5">
            Why Choose Us?
          </h2>

          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            We provide high-quality garments products with
            modern fashion trends, smooth production
            workflow, and reliable customer service for
            businesses around the world.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-base-200 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <FaTshirt className="text-5xl mx-auto text-primary mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Premium Products
            </h3>

            <p className="text-gray-500">
              High-quality garments with modern styles and
              excellent materials for every customer.
            </p>
          </div>

          <div className="bg-base-200 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <FaShippingFast className="text-5xl mx-auto text-primary mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Fast Delivery
            </h3>

            <p className="text-gray-500">
              Smooth order processing and real-time
              production tracking for faster delivery.
            </p>
          </div>

          <div className="bg-base-200 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <FaUsers className="text-5xl mx-auto text-primary mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Trusted Service
            </h3>

            <p className="text-gray-500">
              Dedicated support team ensuring customer
              satisfaction and business reliability.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;