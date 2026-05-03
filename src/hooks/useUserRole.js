// import { useContext, useEffect, useState } from "react";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// const useUserRole = () => {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       api.get(`/api/users/role/${user.email}`)
//         .then(res => {
//           setRole(res.data.role);
//           setStatus(res.data.status);
//           setLoading(false);
//         });
//     }
//   }, [user]);

//   return { role, status, loading };
// };

// export default useUserRole;