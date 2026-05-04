import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";

import Login from "../pages/Login";

import Register from "../pages/Register";

import AllProducts from "../pages/AllProducts";

import ProductDetails from "../pages/ProductDetails";

import Booking from "../pages/Booking";

import PrivateRoute from "./PrivateRoute";

import RoleRoute from "./RoleRoute";

import MyOrders from "../pages/dashboard/User/MyOrders";

import TrackOrder from "../pages/dashboard/User/TrackOrder";

import Profile from "../pages/dashboard/User/Profile";

import AddProduct from "../pages/dashboard/Manager/AddProduct";

import ManageProducts from "../pages/dashboard/Manager/ManageProducts";

import PendingOrder from "../pages/dashboard/Manager/PendingOrder";

import ApprovedOrders from "../pages/dashboard/Manager/ApprovedOrders";

import ManagerUser from "../pages/dashboard/Admin/ManagerUser";

import AllOrders from "../pages/dashboard/Admin/AllOrders";

import AllProduct from "../pages/dashboard/Admin/AllProduct";

import NotFound from "../pages/NotFound";

import About from "../pages/About";

import Contact from "../pages/Contact";

import OrderDetail from "../pages/dashboard/Admin/OrderDetail";

import UpdateProduct from "../pages/dashboard/Admin/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "products",
        element: <AllProducts />,
      },

      {
        path: "products/:id",
        element: <ProductDetails />,
      },

      {
        path: "booking/:id",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "my-orders",

        element: (
          <RoleRoute role="buyer">
            <MyOrders />
          </RoleRoute>
        ),
      },

      {
        path: "track-order/:id",   
        element: <TrackOrder />
      },

      {
        path: "profile",

        element: <Profile />,
      },

      {
        path: "add-product",

        element: (
          <RoleRoute role="manager">
            <AddProduct />
          </RoleRoute>
        ),
      },

      {
        path: "manage-products",

        element: (
          <RoleRoute role="manager">
            <ManageProducts />
          </RoleRoute>
        ),
      },

      {
        path: "pending-orders",

        element: (
          <RoleRoute role="manager">
            <PendingOrder />
          </RoleRoute>
        ),
      },

      {
        path: "approved-orders",

        element: (
          <RoleRoute role="manager">
            <ApprovedOrders />
          </RoleRoute>
        ),
      },

      {
        path: "manage-users",

        element: (
          <RoleRoute role="admin">
            <ManagerUser />
          </RoleRoute>
        ),
      },

      {
        path: "all-orders",

        element: (
          <RoleRoute role="admin">
            <AllOrders />
          </RoleRoute>
        ),
      },

      {
      path: "order-details/:id",

      element: (
        <RoleRoute role="admin">
          <OrderDetail />
        </RoleRoute>
      ),
      },

      {
        path: "all-products",

        element: (
          <RoleRoute role="admin">
            <AllProduct />
          </RoleRoute>
        ),
      },
      
      {
        path: "update-product/:id",
        element: (
          <RoleRoute role="admin">
            <UpdateProduct />
          </RoleRoute>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;