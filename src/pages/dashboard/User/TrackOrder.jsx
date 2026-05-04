import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  // ✅ FIX: loading state
  if (!order) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading order...
      </p>
    );
  }

  // ✅ FIX: safe tracking
  const tracking = order.tracking || [];

  return (
    <div className="max-w-3xl mx-auto p-4">

      <h2 className="text-4xl font-bold mb-6 text-center">
        Track Order
      </h2>

      {/* ORDER INFO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <p><b>Product:</b> {order.productName}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Payment:</b> {order.paymentStatus}</p>
      </div>

      {/* TIMELINE */}
      {tracking.length === 0 ? (
        <p className="text-center text-gray-500">
          🚚 No tracking updates yet
        </p>
      ) : (
        <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
          {tracking.map((track, index) => {
            const isLast = index === tracking.length - 1;

            return (
              <div key={index} className="relative">

                {/* DOT */}
                <span
                  className={`absolute -left-[13px] top-2 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    isLast ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  ●
                </span>

                {/* CARD */}
                <div
                  className={`p-4 rounded-lg shadow ${
                    isLast
                      ? "bg-green-50 border border-green-300"
                      : "bg-white"
                  }`}
                >
                  <p className="font-bold">{track.status}</p>

                  <p className="text-sm text-gray-600">
                    {new Date(track.date).toLocaleString()}
                  </p>

                  {track.location && <p>{track.location}</p>}
                  {track.note && (
                    <p className="text-gray-500">{track.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;