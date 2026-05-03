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

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const fetchOrders = async () => {
    const res = await api.get(
      "/api/orders/approved"
    );

    setOrders(res.data);
  };

  useEffect(() => {
    document.title = "Approved Orders";

    fetchOrders();
  }, []);

  const handleTracking = async () => {
    await api.patch(
      `/api/orders/tracking/${selectedOrder}`,
      trackingData
    );

    toast.success("Tracking Updated");

    document.getElementById(
      "tracking_modal"
    ).close();

    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        Approved Orders
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

                <td>
                  <button
                    onClick={() => {
                      setSelectedOrder(order._id);

                      document
                        .getElementById(
                          "tracking_modal"
                        )
                        .showModal();
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Add Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="tracking_modal" className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-5">
            Add Tracking
          </h2>

          <select
            className="select select-bordered w-full mb-4"
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

          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full mb-4"
            onChange={(e) =>
              setTrackingData({
                ...trackingData,
                location: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Note"
            className="textarea textarea-bordered w-full"
            onChange={(e) =>
              setTrackingData({
                ...trackingData,
                note: e.target.value,
              })
            }
          ></textarea>

          <button
            onClick={handleTracking}
            className="btn btn-primary mt-5"
          >
            Save Tracking
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;