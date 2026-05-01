import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", form);
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;