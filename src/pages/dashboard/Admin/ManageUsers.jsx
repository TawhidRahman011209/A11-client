import { useEffect, useState } from "react";
import api from "../../../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  const updateRole = async (id, role) => {
    await api.patch(`/users/${id}`, { role });
    alert("Updated!");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <button onClick={() => updateRole(u._id, "manager")}>
                Make Manager
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageUsers;