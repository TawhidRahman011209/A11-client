// src/pages/Contact.jsx

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-base-100 text-base-content overflow-hidden transition-colors duration-500">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-28 px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
            Contact Us
          </h1>

          <p className="text-lg md:text-2xl leading-9 text-white/90 max-w-4xl mx-auto">
            We would love to hear from you. Whether you have
            questions about garments production, order
            tracking, delivery updates, or customer support —
            our team is always ready to help you with the
            best service possible.
          </p>
        </motion.div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-24 px-5 bg-base-200 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-10">

            {/* EMAIL CARD */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 text-base-content rounded-3xl shadow-2xl p-10 text-center border border-base-300 transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg mb-6">
                <FaEnvelope />
              </div>

              <h2 className="text-3xl font-bold mb-5 text-primary">
                Email Support
              </h2>

              <p className="leading-8 mb-8 text-lg opacity-80">
                Contact our support team anytime for
                technical issues, order updates, and business
                inquiries.
              </p>

              <p className="font-bold text-xl text-primary">
                support@garmentspro.com
              </p>
            </motion.div>

            {/* PHONE CARD */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 text-base-content rounded-3xl shadow-2xl p-10 text-center border border-base-300 transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-3xl shadow-lg mb-6">
                <FaPhoneAlt />
              </div>

              <h2 className="text-3xl font-bold mb-5 text-primary">
                Phone Number
              </h2>

              <p className="leading-8 mb-8 text-lg opacity-80">
                Speak directly with our customer care
                representatives for quick assistance and
                support.
              </p>

              <p className="font-bold text-xl text-primary">
                +880123456789
              </p>
            </motion.div>

            {/* ADDRESS CARD */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 text-base-content rounded-3xl shadow-2xl p-10 text-center border border-base-300 transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white text-3xl shadow-lg mb-6">
                <FaMapMarkerAlt />
              </div>

              <h2 className="text-3xl font-bold mb-5 text-primary">
                Office Address
              </h2>

              <p className="leading-8 mb-8 text-lg opacity-80">
                Visit our main office for meetings,
                production discussions, and collaboration
                opportunities.
              </p>

              <p className="font-bold text-xl text-primary">
                Dhaka, Bangladesh
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* EXTRA SECTION */}
      <section className="py-24 px-5 bg-base-100 transition-colors duration-500">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center bg-base-200 text-base-content rounded-[40px] shadow-2xl p-12 md:p-20 border border-base-300 transition-all duration-500"
        >
          <h2 className="text-5xl font-extrabold mb-8 text-primary">
            Why Choose GarmentsPro?
          </h2>

          <p className="text-xl leading-10 opacity-80">
            GarmentsPro helps businesses manage garments
            production, order tracking, and customer
            communication efficiently. Our platform is
            designed with modern technology to provide a
            smooth, reliable, and professional experience
            for factories, managers, and buyers around the
            world.
          </p>
        </motion.div>

      </section>
    </div>
  );
};

export default Contact;