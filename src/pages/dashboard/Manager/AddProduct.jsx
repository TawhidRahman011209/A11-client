import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, watch } = useForm();

  const [preview, setPreview] = useState([]);

  const imageValue = watch("images");

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        moq: Number(data.moq),
        images: data.images.split(","),
        showOnHome: data.showOnHome || false,
        createdBy: user.email,
      };

      await api.post("/api/products", productData);

      toast.success("Product Added");
      reset();
      setPreview([]);
    } catch (error) {
      toast.error(error.message);
    }
  };
const handleFileUpload = (e) => {
  const files = Array.from(e.target.files);

  const imageUrls = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreview(imageUrls);
};
  const handlePreview = (value) => {
    if (!value) return;
    const imgs = value.split(",");
    setPreview(imgs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-3xl">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">

        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* PRODUCT NAME */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              {...register("name", { required: true })}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              <option>Shirt</option>
              <option>Pant</option>
              <option>Jacket</option>
              <option>Accessories</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none appearance-auto"
              {...register("price", { required: true })}
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none appearance-auto"
              {...register("quantity", { required: true })}
            />
          </div>

          {/* MOQ */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Minimum Order Quantity (MOQ)
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none appearance-auto"
              {...register("moq", { required: true })}
            />
          </div>

          {/* IMAGE URL */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Images
            </label>

            {/* FILE UPLOAD BUTTON */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input file-input-bordered w-full mb-3"
            />

            {/* OR TEXT INPUT */}
            <input
              type="text"
              placeholder="Or paste image URLs (comma separated)"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none"
              {...register("images")}
              onBlur={(e) => handlePreview(e.target.value)}
            />
          </div>

          {/* IMAGE PREVIEW */}
          <div className="flex gap-3 flex-wrap md:col-span-2">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-24 h-24 rounded-xl shadow-md border object-cover hover:scale-105 transition"
              />
            ))}
          </div>
          {/* DEMO VIDEO */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Demo Video Link
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none"
              {...register("demoVideo")}
            />
          </div>

          {/* PAYMENT */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Payment Option
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none"
              {...register("paymentOption", { required: true })}
            >
              <option value="">Select Payment</option>
              <option>Cash on Delivery</option>
              <option>PayFirst</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-indigo-400 outline-none"
              rows="4"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* CHECKBOX */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 text-gray-700 font-medium">
              <input
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
                {...register("showOnHome")}
              />
              Show on Home Page
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-700 hover:to-purple-700 
            shadow-lg hover:shadow-xl transition duration-300"
          >
            ➕ Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;