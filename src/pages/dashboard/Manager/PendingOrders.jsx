import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../../../services/api";

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get(
      "/api/orders/pending"
    );

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
    <div>
      <h2 className="text-4xl font-bold mb-8">
        Pending Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>

              <th>Product</th>

              <th>Quantity</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userEmail}</td>

                <td>{order.productName}</td>

                <td>{order.quantity}</td>

                <td>{order.status}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      handleApprove(order._id)
                    }
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(order._id)
                    }
                    className="btn btn-sm btn-error"
                  >
                    Reject
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