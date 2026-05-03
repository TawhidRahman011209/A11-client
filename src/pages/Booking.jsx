import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import { AuthContext } from "../context/AuthContext";

const Booking = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const quantity = watch("quantity");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/api/products/${id}`);

      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && quantity) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const onSubmit = async (data) => {
    if (data.quantity > product.quantity) {
      return toast.error(
        "Cannot exceed available quantity"
      );
    }

    if (data.quantity < product.moq) {
      return toast.error(
        "Minimum order quantity not reached"
      );
    }

    try {
      const orderData = {
        ...data,
        userEmail: user.email,
        productId: product._id,
        productName: product.name,
        totalPrice,
        paymentMethod: product.paymentOption,
      };

      await api.post("/api/orders", orderData);

      toast.success("Order Placed Successfully");

      navigate("/dashboard/my-orders");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-5">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-center mb-8">
            Booking Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered"
              />

              <input
                type="text"
                value={product.name}
                readOnly
                className="input input-bordered"
              />

              <input
                type="text"
                value={`$${product.price}`}
                readOnly
                className="input input-bordered"
              />

              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                {...register("firstName")}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                {...register("lastName")}
              />

              <input
                type="number"
                placeholder="Order Quantity"
                className="input input-bordered"
                {...register("quantity")}
              />

              <input
                type="text"
                value={totalPrice}
                readOnly
                className="input input-bordered"
              />

              <input
                type="text"
                placeholder="Contact Number"
                className="input input-bordered"
                {...register("phone")}
              />
            </div>

            <textarea
              placeholder="Delivery Address"
              className="textarea textarea-bordered w-full mt-5"
              {...register("address")}
            ></textarea>

            <textarea
              placeholder="Additional Notes"
              className="textarea textarea-bordered w-full mt-5"
              {...register("notes")}
            ></textarea>

            <button className="btn btn-primary w-full mt-8">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;