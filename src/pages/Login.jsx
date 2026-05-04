import { useContext, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

const Login = () => {
  const { loginUser, googleLogin } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state || "/";

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(
        data.email,
        data.password
      );

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

      await api.post(
        "/api/auth/save-user",
        userData
      );

      toast.success(
        "Google Login Successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-gradient-to-br from-base-300 via-base-200 to-base-100 transition-all duration-500">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-3xl border border-base-300">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-extrabold text-base-content">
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
            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold text-base-content">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-base-200 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold text-base-content">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-base-200 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  {...register("password", {
                    required: true,
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-error text-sm mt-2">
                  Password is required
                </p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
              Login
            </button>
          </form>

          <div className="divider my-7 text-base-content/50">
            OR CONTINUE WITH
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-base-200 border border-base-300 shadow-md hover:shadow-xl hover:bg-base-300 transition-all duration-300 font-semibold text-base-content"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
              className="w-5 h-5"
            />

            Continue With Google
          </button>

          <p className="text-center mt-8 text-base-content/70">
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