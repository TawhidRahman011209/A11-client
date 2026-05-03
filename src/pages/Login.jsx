import { useContext } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

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
    <div className="min-h-screen flex justify-center items-center px-5 bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      <div className="w-full max-w-md bg-base-100/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-base-300">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-extrabold">
              Welcome Back
            </h2>

            <p className="text-base-content/70 mt-3">
              Login to continue shopping
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label className="label font-semibold">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full h-12"
                {...register("email", {
                  required: true,
                })}
              />

              {errors.email && (
                <p className="text-error text-sm mt-2">
                  Email is required
                </p>
              )}
            </div>

            <div>
              <label className="label font-semibold">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full h-12"
                {...register("password", {
                  required: true,
                })}
              />

              {errors.password && (
                <p className="text-error text-sm mt-2">
                  Password is required
                </p>
              )}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
              Login
            </button>
          </form>

          <div className="divider my-7">
            OR CONTINUE WITH
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full mt-4 bg-white text-black border border-gray-300 hover:bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
              className="w-5 h-5"
            />

            Continue With Google
          </button>

          <p className="text-center mt-8 text-base-content/80">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline"
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