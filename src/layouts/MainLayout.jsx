import { Outlet } from "react-router-dom";

import Navbar from "../components/shared/Navbar";

import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;