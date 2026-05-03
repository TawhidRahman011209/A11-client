const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <aside>
        <h2 className="text-3xl font-bold text-primary">
          GarmentsPro
        </h2>

        <p className="max-w-xl">
          Smart garments order & production tracking
          platform for factories and buyers.
        </p>

        <p>
          Copyright © {new Date().getFullYear()} - All
          rights reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;