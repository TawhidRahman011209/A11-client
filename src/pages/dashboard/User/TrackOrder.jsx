import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../../services/api";

const TrackOrder = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get(`/api/orders/${id}`);

      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return null;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">
        Track Order
      </h2>

      <ul className="timeline timeline-vertical">
        {order.tracking?.map((track, index) => (
          <li key={index}>
            <div className="timeline-start">
              {new Date(
                track.date
              ).toLocaleDateString()}
            </div>

            <div className="timeline-middle">
              🔵
            </div>

            <div className="timeline-end timeline-box">
              <h2 className="font-bold">
                {track.status}
              </h2>

              <p>{track.location}</p>

              <p>{track.note}</p>
            </div>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackOrder;