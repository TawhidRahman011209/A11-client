import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-base-200 text-base-content px-6 py-10 mt-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

        {/* Left Side */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-primary">
            Contact Info
          </h3>

          <p>📧 garmentspro@gmail.com</p>

          <p>📞 +880 1234-567890</p>

          <p>📍 Dhaka, Bangladesh</p>
        </div>

        {/* Middle Side */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-primary">
            GarmentsPro
          </h2>

          <p className="max-w-xl mx-auto">
            Smart garments order & production tracking
            platform for factories and buyers.
          </p>

          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:justify-end gap-5 text-2xl">

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-600 transition"
          >
            <FaYoutube />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-500 transition"
          >
            <FaTwitter />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;