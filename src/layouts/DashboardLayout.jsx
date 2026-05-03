import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden m-4"
        >
          Open Dashboard
        </label>

        <div className="p-5">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <h2 className="text-2xl font-bold mb-5">
            Dashboard
          </h2>

          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile">
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-orders">
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/track-order/1">
              Track Order
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/add-product">
              Add Product
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-products">
              Manage Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/pending-orders">
              Pending Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/approved-orders">
              Approved Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-users">
              Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-orders">
              All Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-products">
              All Products
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;