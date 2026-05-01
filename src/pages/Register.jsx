import { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (password.length < 6)
      return "Password must be at least 6 characters";
    if (!hasUpper) return "Must include uppercase letter";
    if (!hasLower) return "Must include lowercase letter";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(form.password);
    if (error) return alert(error);

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="buyer">Buyer</option>
        <option value="manager">Manager</option>
      </select>

      <button>Register</button>
    </form>
  );
};

export default Register;