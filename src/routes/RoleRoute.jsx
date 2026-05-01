import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleRoute = ({ children, allowedRoles }) => {
  const { dbUser, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!allowedRoles.includes(dbUser?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;