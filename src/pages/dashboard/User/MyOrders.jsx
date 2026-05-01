import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      {orders.map(o => (
        <div key={o._id}>
          <p>{o.product?.name}</p>
          <p>{o.status}</p>

          <Link to={`/dashboard/track-order/${o._id}`}>
            Track
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;