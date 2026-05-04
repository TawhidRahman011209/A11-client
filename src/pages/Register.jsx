import { useContext, useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    createUser,
    googleLogin,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [previewImage, setPreviewImage] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL =
        URL.createObjectURL(file);

      setPreviewImage(imageURL);
    }
  };

  const onSubmit = async (data) => {
    try {
      await createUser(
        data.email,
        data.password,
        data.name,
        data.photoURL
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister =
    async () => {
      try {
        await googleLogin();

        toast.success(
          "Google Register Successful"
        );

        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-gradient-to-br from-base-300 via-base-200 to-base-100 transition-all duration-500">
      <div className="w-full max-w-lg bg-base-100 shadow-2xl rounded-3xl border border-base-300">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-extrabold text-base-content">
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
            {/* NAME */}
            <div>
              <label className="block mb-2 font-semibold text-base-content">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-base-200 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                {...register("name", {
                  required: true,
                })}
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block mb-2 font-semibold text-base-content">
                Profile Picture URL
              </label>

              <input
                type="text"
                placeholder="Paste image URL"
                className="w-full px-4 py-3 rounded-xl bg-base-200 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                {...register("photoURL")}
              />

              <div className="mt-4">
                <label className="block mb-2 font-semibold text-base-content">
                  OR Upload Image Preview
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                  className="file-input file-input-bordered w-full bg-base-200 border-base-300 text-base-content"
                />

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-24 h-24 rounded-full object-cover mt-4 border-4 border-primary shadow-lg"
                  />
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold text-base-content">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-base-200 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                {...register("email", {
                  required: true,
                })}
              />
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
                  {...register(
                    "password",
                    {
                      required: true,
                      validate:
                        validatePassword,
                    }
                  )}
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
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* REGISTER BUTTON */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
              Register
            </button>
          </form>

          <div className="divider my-7 text-base-content/50">
            OR CONTINUE WITH
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={
              handleGoogleRegister
            }
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