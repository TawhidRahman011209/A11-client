import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";

import api from "../../../services/api";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/api/users/me");

        setDbUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* TOP BG */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
          <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt=""
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-24 pb-10 px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            {user?.displayName || "User"}
          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-700">
                User Role
              </h3>

              <p className="text-2xl font-extrabold text-indigo-700 mt-2 capitalize">
                {dbUser?.role || "buyer"}
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-700">
                Account Status
              </h3>

              <p className="text-2xl font-extrabold text-pink-700 mt-2 capitalize">
                {dbUser?.status || "pending"}
              </p>
            </div>
          </div>

          {/* SUSPENDED INFO */}
          {dbUser?.status === "suspended" && (
            <div className="bg-red-100 border border-red-300 rounded-2xl p-5 mt-8">
              <p className="text-red-600 font-semibold">
                Reason: {dbUser?.suspendReason}
              </p>

              <p className="text-red-600 mt-2">
                Feedback: {dbUser?.feedback}
              </p>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={logout}
            className="mt-10 btn border-0 px-8 text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-2xl shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;