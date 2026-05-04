import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

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

  const filteredOrders = useMemo(() => {
    if (!filter) return orders;
    return orders.filter(
      (order) => order.status === filter
    );
  }, [orders, filter]);

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
      
      <h2 className="text-4xl font-bold mb-6">
        All Orders
      </h2>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        
        <input
          type="text"
          placeholder="Search by product/user"
          className="input input-bordered w-full bg-base-100 shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full lg:w-60 px-4 py-2 rounded-xl 
                     bg-base-100 border border-base-300 
                     shadow-md hover:shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-primary 
                     transition"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        
        <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-300">
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

        <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-300">
          <h2 className="text-2xl font-bold mb-5">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={100} label>
                {statusData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="text-black text-sm font-semibold">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  
                  <td className="text-xs opacity-70">
                    {order._id.slice(-6)}
                  </td>

                  <td>{order.userEmail}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>

                  {/* ✅ CLEAN STATUS (NO BLUE BG) */}
                  <td className="font-medium text-gray-700">
                    {order.status}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/order-details/${order._id}`)
                      }
                      className="px-4 py-1.5 text-sm rounded-lg 
                                 border border-gray-300 
                                 bg-white text-black 
                                 shadow-md hover:shadow-lg 
                                 hover:bg-gray-100 transition"
                    >
                      View
                    </button>
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