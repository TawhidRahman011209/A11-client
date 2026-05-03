import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

const Register = () => {
  const { createUser, updateUser } =
    useContext(AuthContext);

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

  return (
    <div className="min-h-screen flex justify-center items-center px-5">
      <div className="card bg-base-100 shadow-2xl w-full max-w-lg">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-center mb-5">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">Name</label>

              <input
                type="text"
                className="input input-bordered"
                {...register("name", {
                  required: true,
                })}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">Photo URL</label>

              <input
                type="text"
                className="input input-bordered"
                {...register("photoURL", {
                  required: true,
                })}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">Email</label>

              <input
                type="email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                })}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">Role</label>

              <select
                className="select select-bordered"
                {...register("role")}
              >
                <option value="buyer">Buyer</option>

                <option value="manager">
                  Manager
                </option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">Password</label>

              <input
                type="password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                  validate: validatePassword,
                })}
              />

              {errors.password && (
                <p className="text-red-500 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold"
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