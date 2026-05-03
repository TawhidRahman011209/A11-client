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
    <div>
      <h2 className="text-4xl font-bold mb-8">
        All Orders
      </h2>

      <input
        type="text"
        placeholder="Search by product/user"
        className="input input-bordered w-full mb-8"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        <div className="bg-base-100 p-5 rounded-xl shadow">
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

        <div className="bg-base-100 p-5 rounded-xl shadow">
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

      <div className="overflow-x-auto">
        <table className="table">
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
              <tr key={order._id}>
                <td>{order.userEmail}</td>

                <td>{order.productName}</td>

                <td>{order.quantity}</td>

                <td>${order.totalPrice}</td>

                <td>{order.status}</td>

                <td>{order.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;