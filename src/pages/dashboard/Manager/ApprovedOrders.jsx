import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [trackingData, setTrackingData] = useState({
    status: "",
    location: "",
    note: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await api.get("/api/orders/approved");
    setOrders(res.data);
  };

  useEffect(() => {
    document.title = "Approved Orders";
    fetchOrders();
  }, []);

  const handleTracking = async () => {
    await api.patch(`/api/orders/tracking/${selectedOrder}`, trackingData);
    toast.success("Tracking Updated");
    document.getElementById("tracking_modal").close();
    fetchOrders();
  };

  return (
    <div className="pl-4">

      {/* TITLE */}
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Approved Orders
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">

          <thead>
            <tr className="text-left text-gray-600">
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
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
                  {order.approvedAt
                    ? new Date(order.approvedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="rounded-r-xl">
                  <button
                    onClick={() => {
                      setSelectedOrder(order._id);
                      document.getElementById("tracking_modal").showModal();
                    }}
                    className="px-3 py-1 text-sm rounded-lg text-white font-semibold 
                    bg-gradient-to-r from-purple-500 to-indigo-500
                    hover:from-purple-600 hover:to-indigo-600
                    active:scale-95 transition shadow-md"
                  >
                    🚚 Add Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      <dialog id="tracking_modal" className="modal">
        <div className="modal-box max-w-md rounded-2xl p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Tracking
          </h2>

          {/* STATUS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Status</label>
            <select
              className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
              onChange={(e) =>
                setTrackingData({
                  ...trackingData,
                  status: e.target.value,
                })
              }
            >
              <option>Cutting Completed</option>
              <option>Sewing Started</option>
              <option>Finishing</option>
              <option>QC Checked</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
            </select>
          </div>

          {/* LOCATION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
              onChange={(e) =>
                setTrackingData({
                  ...trackingData,
                  location: e.target.value,
                })
              }
            />
          </div>

          {/* NOTE */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Note</label>
            <textarea
              placeholder="Add note..."
              className="textarea textarea-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
              onChange={(e) =>
                setTrackingData({
                  ...trackingData,
                  note: e.target.value,
                })
              }
            ></textarea>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between items-center">

            <button
              onClick={handleTracking}
              className="px-6 py-2 rounded-xl text-white font-semibold
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              transition shadow-md"
            >
              💾 Save Changes
            </button>

            <button
              onClick={() =>
                document.getElementById("tracking_modal").close()
              }
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>

          </div>

        </div>
      </dialog>

    </div>
  );
};

export default ApprovedOrders;