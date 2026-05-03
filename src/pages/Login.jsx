import { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

const Login = () => {
  const { loginUser, googleLogin } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);

      toast.success("Login Successful");

      navigate(from);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "buyer",
        status: "pending",
      };

      await api.post("/api/auth/save-user", userData);

      toast.success("Google Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-center mb-5">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">Email</label>

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                })}
              />

              {errors.email && (
                <p className="text-red-500 mt-1">
                  Email Required
                </p>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Password</label>

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                })}
              />

              {errors.password && (
                <p className="text-red-500 mt-1">
                  Password Required
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mt-4"
          >
            Google Login
          </button>

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;