import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";

import api from "../../../services/api";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get("/api/users/me");

      setDbUser(res.data);
    };

    getUser();
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <img
            src={user?.photoURL}
            alt=""
            className="w-28 h-28 rounded-full"
          />

          <h2 className="text-3xl font-bold">
            {user?.displayName}
          </h2>

          <p>{user?.email}</p>

          <p>
            <span className="font-bold">Role:</span>{" "}
            {dbUser?.role}
          </p>

          <p>
            <span className="font-bold">Status:</span>{" "}
            {dbUser?.status}
          </p>

          {dbUser?.status === "suspended" && (
            <>
              <p className="text-red-500">
                Reason: {dbUser?.suspendReason}
              </p>

              <p className="text-red-500">
                Feedback: {dbUser?.feedback}
              </p>
            </>
          )}

          <button
            onClick={logout}
            className="btn btn-error mt-5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;