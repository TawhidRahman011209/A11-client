import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

const Register = () => {
  const {
    createUser,
    updateUser,
    googleLogin,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;

    const lowercase = /[a-z]/;

    if (!uppercase.test(password)) {
      return "Must contain uppercase";
    }

    if (!lowercase.test(password)) {
      return "Must contain lowercase";
    }

    if (password.length < 6) {
      return "Minimum 6 characters";
    }

    return true;
  };

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);

      await updateUser(data.name, data.photoURL);

      const userData = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        role: data.role,
        status: "pending",
      };

      await api.post("/api/auth/save-user", userData);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
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

      toast.success("Google Register Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-10">
      <div className="w-full max-w-lg bg-base-100/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-base-300">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-extrabold">
              Create Account
            </h2>

            <p className="text-base-content/70 mt-3">
              Join GarmentsPro today
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full h-12"
              {...register("name", {
                required: true,
              })}
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full h-12"
              {...register("photoURL", {
                required: true,
              })}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full h-12"
              {...register("email", {
                required: true,
              })}
            />

            <select
              className="select select-bordered w-full h-12"
              {...register("role")}
            >
              <option value="buyer">
                Buyer
              </option>

              <option value="manager">
                Manager
              </option>
            </select>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full h-12"
                {...register("password", {
                  required: true,
                  validate: validatePassword,
                })}
              />

              {errors.password && (
                <p className="text-error text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
              Register
            </button>
          </form>

          <div className="divider my-7">
            OR CONTINUE WITH
          </div>

          <button
            onClick={handleGoogleRegister}
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;