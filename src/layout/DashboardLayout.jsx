import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { dbUser, logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>

        {/* Admin */}
        {dbUser?.role === "admin" && (
          <>
            <Link to="manage-users">Manage Users</Link>
            <Link to="all-products">All Products</Link>
            <Link to="all-orders">All Orders</Link>
          </>
        )}

        {/* Manager */}
        {dbUser?.role === "manager" && (
          <>
            <Link to="add-product">Add Product</Link>
            <Link to="manage-products">Manage Products</Link>
            <Link to="pending-orders">Pending Orders</Link>
            <Link to="approved-orders">Approved Orders</Link>
          </>
        )}

        {/* Buyer */}
        {dbUser?.role === "buyer" && (
          <>
            <Link to="my-orders">My Orders</Link>
            <Link to="profile">Profile</Link>
          </>
        )}

        <button onClick={logout} className="mt-6">
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;