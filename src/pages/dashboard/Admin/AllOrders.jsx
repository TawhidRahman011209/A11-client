import { useEffect, useState } from "react";
import api from "../../../services/api";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>User</th><th>Product</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o._id}>
            <td>{o.user?.email}</td>
            <td>{o.product?.name}</td>
            <td>{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllOrders;