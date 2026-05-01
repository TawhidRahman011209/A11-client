import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Booking = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    quantity: 1,
    address: "",
    phone: "",
  });

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const totalPrice = form.quantity * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.quantity < product.minOrder ||
      form.quantity > product.quantity
    ) {
      return alert("Invalid quantity");
    }

    try {
      await api.post("/orders", {
        productId: product._id,
        quantity: form.quantity,
        address: form.address,
        phone: form.phone,
      });

      alert("Order placed!");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">

      <h1 className="text-xl font-bold">{product.name}</h1>

      <input value={product.price} readOnly />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) =>
          setForm({ ...form, quantity: Number(e.target.value) })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Address"
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <p>Total: ${totalPrice}</p>

      <button className="btn">Confirm Order</button>
    </form>
  );
};

export default Booking;