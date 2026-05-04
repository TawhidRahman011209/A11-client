import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../services/api";

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await api.get("/api/orders/pending");
    setOrders(res.data);
  };

  useEffect(() => {
    document.title = "Pending Orders";
    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    await api.patch(`/api/orders/approve/${id}`);
    toast.success("Order Approved");
    fetchOrders();
  };

  const handleReject = async (id) => {
    await api.patch(`/api/orders/reject/${id}`);
    toast.success("Order Rejected");
    fetchOrders();
  };

  return (
  <div className="pl-4">

    <h2 className="text-4xl font-bold mb-8 text-gray-800">
      Pending Orders
    </h2>

    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-3">
        {/* 👆 adds space between rows */}

        <thead>
          <tr className="text-left text-gray-600">
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
            >
              <td className="rounded-l-xl font-medium">
                {order._id.slice(-6)}
              </td>

              <td>{order.userEmail}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="flex gap-2 rounded-r-xl">

                {/* APPROVE */}
                <button
                  onClick={() => handleApprove(order._id)}
                  className="px-3 py-1 text-sm rounded-lg text-white font-semibold 
                  bg-green-500 hover:bg-green-600 active:scale-95 transition shadow-md"
                >
                  ✔ Approve
                </button>

                {/* REJECT */}
                <button
                  onClick={() => handleReject(order._id)}
                  className="px-3 py-1 text-sm rounded-lg text-white font-semibold 
                  bg-red-500 hover:bg-red-600 active:scale-95 transition shadow-md"
                >
                  ✖ Reject
                </button>

                {/* VIEW */}
                <button
                  onClick={() =>
                    navigate(`/dashboard/order-details/${order._id}`)
                  }
                  className="px-3 py-1 text-sm rounded-lg text-white font-semibold 
                  bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition shadow-md"
                >
                  👁 View
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default PendingOrder;