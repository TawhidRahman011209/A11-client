import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../../../services/api";

const ManagerUser = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [suspendData, setSuspendData] =
    useState({
      suspendReason: "",
      feedback: "",
    });

  const [selectedUser, setSelectedUser] =
    useState(null);

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

  const updateRole = async (
    id,
    role,
    status = "approved"
  ) => {
    await api.patch(`/api/users/${id}`, {
      role,
      status,
    });

    toast.success("User Updated");

    fetchUsers();
  };

  const suspendUser = async () => {
    await api.patch(
      `/api/users/${selectedUser}`,
      {
        status: "suspended",
        suspendReason:
          suspendData.suspendReason,
        feedback: suspendData.feedback,
      }
    );

    toast.success("User Suspended");

    document
      .getElementById("suspend_modal")
      .close();

    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        Manage Users
      </h2>

      <input
        type="text"
        placeholder="Search users"
        className="input input-bordered w-full mb-8"
        onChange={(e) => setSearch(e.target.value)}
      />

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
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>{user.status}</td>

                <td className="flex gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      updateRole(
                        user._id,
                        "manager"
                      )
                    }
                    className="btn btn-sm btn-primary"
                  >
                    Make Manager
                  </button>

                  <button
                    onClick={() =>
                      updateRole(
                        user._id,
                        "buyer"
                      )
                    }
                    className="btn btn-sm btn-secondary"
                  >
                    Make Buyer
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(user._id);

                      document
                        .getElementById(
                          "suspend_modal"
                        )
                        .showModal();
                    }}
                    className="btn btn-sm btn-error"
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="suspend_modal" className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-5">
            Suspend User
          </h2>

          <input
            type="text"
            placeholder="Suspend Reason"
            className="input input-bordered w-full mb-4"
            onChange={(e) =>
              setSuspendData({
                ...suspendData,
                suspendReason:
                  e.target.value,
              })
            }
          />

          <textarea
            placeholder="Feedback"
            className="textarea textarea-bordered w-full"
            onChange={(e) =>
              setSuspendData({
                ...suspendData,
                feedback: e.target.value,
              })
            }
          ></textarea>

          <button
            onClick={suspendUser}
            className="btn btn-error mt-5"
          >
            Confirm Suspend
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ManagerUser;