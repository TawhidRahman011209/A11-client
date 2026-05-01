import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 bg-black text-white">
      <h1 className="font-bold">LOGO</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;