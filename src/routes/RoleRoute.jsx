import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import Loader from "../components/shared/Loader";

import api from "../services/api";

const RoleRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/api/users/me");

        setDbUser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (
    dbUser?.role !== role ||
    dbUser?.status === "suspended"
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;