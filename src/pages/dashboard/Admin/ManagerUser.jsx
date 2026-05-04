import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [updateData, setUpdateData] =
    useState({
      role: "",
      status: "",
      suspendReason: "",
      feedback: "",
    });

  const fetchUsers = async () => {
    const res = await api.get(
      `/api/users?search=${search}`
    );
    setUsers(res.data);
  };

  useEffect(() => {
    document.title = "Manage Users";
    fetchUsers();
  }, [search]);

  const handleUpdateUser = async () => {
    await api.patch(
      `/api/users/${selectedUser}`,
      {
        role: updateData.role,
        status: updateData.status,
        suspendReason:
          updateData.status ===
          "suspended"
            ? updateData.suspendReason
            : "",
        feedback:
          updateData.status ===
          "suspended"
            ? updateData.feedback
            : "",
      }
    );

    toast.success("User Updated");

    document
      .getElementById("update_modal")
      .close();

    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6 rounded-3xl shadow-inner">
      <h2 className="text-4xl font-bold mb-6">
        Manage Users
      </h2>

      <input
        type="text"
        placeholder="🔍 Search users..."
        className="input input-bordered w-full mb-6"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="bg-base-100 rounded-3xl shadow-xl p-4">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b-2 border-base-200"
                >
                  <td className="py-4 font-semibold">
                    {user.name}
                  </td>

                  <td>{user.email}</td>

                  {/* ✅ ROLE (UPDATED) */}
                  <td className="font-semibold">
                    <span
                      className={`capitalize ${
                        user.role === "admin"
                          ? "text-red-500"
                          : user.role ===
                            "manager"
                          ? "text-blue-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* ✅ STATUS (UPDATED) */}
                  <td>
                    <span
                      className={`badge px-3 py-2 text-sm font-medium ${
                        user.status ===
                        "approved"
                          ? "badge-success"
                          : user.status ===
                            "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => {
                          setSelectedUser(
                            user._id
                          );

                          setUpdateData({
                            role: user.role,
                            status:
                              user.status,
                            suspendReason: "",
                            feedback: "",
                          });

                          document
                            .getElementById(
                              "update_modal"
                            )
                            .showModal();
                        }}
                        className="btn btn-xs btn-primary"
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box rounded-3xl p-6 bg-base-100 shadow-2xl border border-base-300">
          <h2 className="text-3xl font-bold mb-5 text-center">
            Update User
          </h2>

          <div className="space-y-4">
            {/* ROLE */}
            <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
              <label className="block text-sm font-semibold mb-2 text-gray-600">
                Role
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={updateData.role}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    role: e.target.value,
                  })
                }
              >
                <option value="buyer">
                  Buyer
                </option>
                <option value="manager">
                  Manager
                </option>
              </select>
            </div>

            {/* STATUS */}
            <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
              <label className="block text-sm font-semibold mb-2 text-gray-600">
                Status
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    status: e.target.value,
                  })
                }
              >
                <option value="approved">
                  Approved
                </option>
                <option value="suspended">
                  Suspended
                </option>
              </select>
            </div>
          </div>

          {/* CONDITIONAL */}
          {updateData.status ===
            "suspended" && (
            <div className="bg-base-200 p-4 rounded-2xl space-y-3 mt-4">
              <input
                type="text"
                placeholder="Suspend Reason"
                className="input input-bordered w-full rounded-xl"
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    suspendReason:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Feedback"
                className="textarea textarea-bordered w-full rounded-xl"
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    feedback:
                      e.target.value,
                  })
                }
              ></textarea>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleUpdateUser}
              className="btn flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none hover:scale-105 transition"
            >
              Save Changes
            </button>

            <button
              onClick={() =>
                document
                  .getElementById(
                    "update_modal"
                  )
                  .close()
              }
              className="btn flex-1 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManagerUser;