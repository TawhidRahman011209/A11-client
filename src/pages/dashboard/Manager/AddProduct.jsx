import { useContext } from "react";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import api from "../../../services/api";

import { AuthContext } from "../../../context/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,

        price: Number(data.price),

        quantity: Number(data.quantity),

        moq: Number(data.moq),

        images: [data.image],

        showOnHome: false,

        createdBy: user.email,
      };

      await api.post("/api/products", productData);

      toast.success("Product Added");

      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-4xl font-bold mb-8">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="input input-bordered"
          {...register("name")}
        />

        <select
          className="select select-bordered"
          {...register("category")}
        >
          <option>Shirt</option>

          <option>Pant</option>

          <option>Jacket</option>

          <option>Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered"
          {...register("price")}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="input input-bordered"
          {...register("quantity")}
        />

        <input
          type="number"
          placeholder="MOQ"
          className="input input-bordered"
          {...register("moq")}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered"
          {...register("image")}
        />

        <input
          type="text"
          placeholder="Demo Video Link"
          className="input input-bordered"
          {...register("demoVideo")}
        />

        <select
          className="select select-bordered"
          {...register("paymentOption")}
        >
          <option>Cash on Delivery</option>

          <option>PayFirst</option>
        </select>

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered md:col-span-2"
          {...register("description")}
        ></textarea>

        <button className="btn btn-primary md:col-span-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;