import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Booking from "../pages/Booking";

// Admin Pages
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import AllProductsAdmin from "../pages/dashboard/Admin/AllProducts";
import AllOrders from "../pages/dashboard/Admin/AllOrders";

// Manager Pages
import AddProduct from "../pages/dashboard/Manager/AddProduct";
import ManageProducts from "../pages/dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/dashboard/Manager/ApprovedOrders";

// User Pages
import MyOrders from "../pages/dashboard/User/MyOrders";
import TrackOrder from "../pages/dashboard/User/TrackOrder";
import Profile from "../pages/dashboard/User/Profile";

// Routes Protection
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const router = createBrowserRouter([
  // ================= MAIN SITE =================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },

      // 🔒 Product Details (Private)
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },

      // 🔒 Booking Route (IMPORTANT)
      {
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // ---------- ADMIN ----------
      {
        path: "manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllProductsAdmin />
          </RoleRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllOrders />
          </RoleRoute>
        ),
      },

      // ---------- MANAGER ----------
      {
        path: "add-product",
        element: (
          <RoleRoute allowedRoles={["manager"]}>
            <AddProduct />
          </RoleRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <RoleRoute allowedRoles={["manager"]}>
            <ManageProducts />
          </RoleRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <RoleRoute allowedRoles={["manager"]}>
            <PendingOrders />
          </RoleRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <RoleRoute allowedRoles={["manager"]}>
            <ApprovedOrders />
          </RoleRoute>
        ),
      },

      // ---------- BUYER / USER ----------
      {
        path: "my-orders",
        element: (
          <RoleRoute allowedRoles={["buyer"]}>
            <MyOrders />
          </RoleRoute>
        ),
      },
      {
        path: "track-order/:id",
        element: (
          <RoleRoute allowedRoles={["buyer"]}>
            <TrackOrder />
          </RoleRoute>
        ),
      },

      // Profile (all logged users)
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ================= 404 PAGE =================
  {
    path: "*",
    element: <h1 className="text-center mt-20">404 Not Found</h1>,
  },
]);

export default router;