import { useEffect, useState } from "react";
import api from "../../../services/api";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders?status=pending")
      .then(res => setOrders(res.data));
  }, []);

  const approve = async (id) => {
    await api.patch(`/orders/${id}`, { status: "approved" });
  };

  return (
    <div>
      {orders.map(o => (
        <div key={o._id}>
          {o.product?.name}
          <button onClick={() => approve(o._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default PendingOrders;