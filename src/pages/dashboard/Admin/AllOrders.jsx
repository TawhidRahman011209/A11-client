import { useEffect, useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import api from "../../../services/api";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "All Orders";

    const fetchOrders = async () => {
      const res = await api.get(
        `/api/orders/admin/all?search=${search}`
      );
      setOrders(res.data);
    };

    fetchOrders();
  }, [search]);

  const statusData = useMemo(() => {
    const counts = {};

    orders.forEach((order) => {
      counts[order.status] =
        (counts[order.status] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [orders]);

  const revenueData = useMemo(() => {
    const counts = {};

    orders.forEach((order) => {
      counts[order.productName] =
        (counts[order.productName] || 0) +
        order.totalPrice;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      revenue: counts[key],
    }));
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6 rounded-3xl shadow-inner">
      
      {/* HEADER */}
      <h2 className="text-4xl font-bold mb-6">
        All Orders
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by product/user"
        className="input input-bordered w-full mb-8 bg-base-100 shadow-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        
        {/* Revenue Box */}
        <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-300 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold mb-5">
            Revenue Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Box */}
        <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-300 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold mb-5">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE BOX */}
      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover">
                  
                  <td className="py-3">
                    {order.userEmail}
                  </td>

                  <td>{order.productName}</td>

                  <td>{order.quantity}</td>

                  <td className="font-semibold">
                    ${order.totalPrice}
                  </td>

                  <td>
                    <span className="badge px-3 py-2 text-sm">
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <span className="badge badge-outline px-3 py-2 text-sm">
                      {order.paymentStatus}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default AllOrders;