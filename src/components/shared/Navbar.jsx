// src/components/shared/Navbar.jsx

import { useContext, useEffect, useState } from "react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import api from "../../services/api";

import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } =
    useContext(AuthContext);

  const [dbUser, setDbUser] =
    useState(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      "light"
  );

  // THEME
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  // GET DB USER
  useEffect(() => {
    const getUser = async () => {
      try {
        if (user?.email) {
          const res = await api.get(
            "/api/users/me"
          );

          setDbUser(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [user]);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // NAV LINKS
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : ""
          }
        >
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : ""
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : ""
          }
        >
          Contact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-5 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-2xl mr-3"
          >
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          GarmentsPro
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {/* THEME BUTTON */}
        <button
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : "light"
            )
          }
          className={`btn btn-sm px-5 rounded-xl shadow-md border-0 ${
            theme === "light"
              ? "bg-white text-slate-800 hover:bg-slate-100"
              : "bg-slate-900 text-white hover:bg-black"
          }`}
        >
          {theme === "light"
            ? "Dark"
            : "Light"}
        </button>

        {/* NOT LOGGED IN */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn px-5 border-0 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn px-5 border-0 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* PROFILE DROPDOWN */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  className="w-11 h-11 rounded-full border-2 border-primary cursor-pointer hover:scale-105 duration-300"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile">
                    👤 Profile
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;