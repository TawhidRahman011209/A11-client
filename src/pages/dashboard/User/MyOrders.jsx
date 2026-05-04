import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

import api from "../../../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get(
      "/api/orders/my-orders"
    );

    setOrders(res.data);
  };

  useEffect(() => {
    document.title = "My Orders";

    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      await api.delete(`/api/orders/${id}`);

      toast.success("Order Cancelled");

      fetchOrders();
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        My Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>

              <th>Quantity</th>

              <th>Status</th>

              <th>Payment</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>

                <td>{order.quantity}</td>

                <td>{order.status}</td>

                <td>{order.paymentStatus}</td>

                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/track-order/${order._id}`}
                    className="btn btn-sm btn-primary">
                    View
                  </Link>

                  {order.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleCancel(order._id)
                      }
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;