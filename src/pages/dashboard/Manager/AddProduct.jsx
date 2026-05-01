import { useState } from "react";
import api from "../../../services/api";

const AddProduct = () => {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/products", form);
    alert("Product Added");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <input placeholder="Price"
        onChange={e => setForm({...form, price: e.target.value})} />

      <input placeholder="Category"
        onChange={e => setForm({...form, category: e.target.value})} />

      <input placeholder="Quantity"
        onChange={e => setForm({...form, quantity: e.target.value})} />

      <button>Add Product</button>
    </form>
  );
};

export default AddProduct;