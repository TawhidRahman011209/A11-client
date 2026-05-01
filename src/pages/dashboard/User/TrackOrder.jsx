import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Tracking</h1>

      {order.tracking.map((t, i) => (
        <div key={i}>
          <p>{t.status}</p>
          <p>{t.location}</p>
          <p>{new Date(t.time).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TrackOrder;