import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added
import api from "../../../services/api";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added

  const [order, setOrder] = useState(null);

  useEffect(() => {
    document.title = "Order Details";

    const fetchOrder = async () => {
      const res = await api.get(`/api/orders/${id}`);
      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6 rounded-3xl shadow-inner">
      
      {/* ✅ BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-base-100 border border-base-300 shadow hover:shadow-md transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6">
        Order Details
      </h2>

      <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-300 mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User:</strong> {order.userEmail}</p>
        <p><strong>Product:</strong> {order.productName}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total:</strong> ${order.totalPrice}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.paymentStatus}</p>
        <p><strong>Address:</strong> {order.address}</p>
      </div>

      <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-300">
        <h3 className="text-xl font-bold mb-4">
          Tracking History
        </h3>

        {order.tracking && order.tracking.length > 0 ? (
          order.tracking.map((track, index) => (
            <div key={index} className="mb-3 border-b pb-2">
              <p><strong>Status:</strong> {track.status}</p>
              <p><strong>Location:</strong> {track.location}</p>
              <p><strong>Note:</strong> {track.note}</p>
              <p className="text-sm text-gray-500">
                {new Date(track.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No tracking updates</p>
        )}
      </div>

    </div>
  );
};

export default OrderDetail;