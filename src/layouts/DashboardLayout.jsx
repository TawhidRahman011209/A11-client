import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-3 py-3 font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
        : "hover:bg-base-300"
    }`;

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* CONTENT */}
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden m-4 rounded-xl"
        >
          Open Dashboard
        </label>

        <div className="p-4 md:p-8">
          <div className="bg-base-100 rounded-3xl shadow-2xl min-h-[90vh] p-5 md:p-8 border border-base-300">
            <Outlet />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu min-h-full w-80 p-6 bg-base-100 shadow-2xl text-base-content">
          {/* LOGO */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GarmentsPro
            </h2>

            <p className="text-sm opacity-70 mt-2">
              Garments Management System
            </p>
          </div>

          <div className="space-y-2">
            <li>
              <NavLink to="/" className={navLinkClass}>
                🏠 Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={navLinkClass}
              >
                👤 Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-orders"
                className={navLinkClass}
              >
                📦 My Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/track-order/1"
                className={navLinkClass}
              >
                🚚 Track Order
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/add-product"
                className={navLinkClass}
              >
                ➕ Add Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage-products"
                className={navLinkClass}
              >
                🛍️ Manage Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/pending-orders"
                className={navLinkClass}
              >
                ⏳ Pending Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/approved-orders"
                className={navLinkClass}
              >
                ✅ Approved Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage-users"
                className={navLinkClass}
              >
                👥 Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/all-orders"
                className={navLinkClass}
              >
                📋 All Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/all-products"
                className={navLinkClass}
              >
                🧥 All Products
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;