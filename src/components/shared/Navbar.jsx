import { useContext, useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import api from "../../services/api";

import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const getUser = async () => {
      if (user?.email) {
        const res = await api.get("/api/users/me");

        setDbUser(res.data);
      }
    };

    getUser();
  }, [user]);

  const handleLogout = async () => {
    await logout();

    toast.success("Logout Successful");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/products">
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/about">About</NavLink>
      </li>

      <li>
        <NavLink to="/contact">
          Contact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard/profile">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-5 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          GarmentsPro
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <button
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : "light"
            )
          }
          className={`btn btn-sm px-5 rounded-xl shadow-md border-0 transition-all duration-300 ${
            theme === "light"
              ? "bg-white text-slate-800 hover:bg-slate-100"
              : "bg-slate-900 text-white hover:bg-black"
          }`}
        >
          {theme === "light"
            ? "Dark"
            : "Light"}
        </button>

        {!user ? (
          <>
            <Link
              to="/login"
              className="btn px-4 border-0 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg rounded-xl">
              Login
            </Link>

            <Link
              to="/register"
              className="btn px-4 border-0 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg rounded-xl">
              Register
            </Link>
          </>
        ) : (
          <>
            <img
              src={user.photoURL}
              alt=""
              className="w-10 h-10 rounded-full"
            />

            <span className="font-semibold hidden md:block">
              {dbUser?.role}
            </span>

            <button
              onClick={handleLogout}
              className="btn btn-error"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;