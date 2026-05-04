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

  const { register, handleSubmit, watch } = useForm();
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
      return toast.error("Exceeds available quantity");
    }

    if (data.quantity < product.moq) {
      return toast.error("Below minimum order quantity");
    }

    try {
      const res = await api.post("/api/orders", {
        ...data,
        userEmail: user.email,
        productId: product._id,
        productName: product.name,
        totalPrice,
        paymentMethod: product.paymentOption,
      });

      toast.success("Order placed!");

      if (product.paymentOption === "Online") {
        navigate(`/payment/${res.data._id}`);
      } else {
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      toast.error("Order failed");
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 py-20 px-5">
      <div className="max-w-4xl mx-auto">

        {/* GLASS CARD */}
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/40">

          {/* TITLE */}
          <h2 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Booking Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid md:grid-cols-2 gap-6">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Email</label>
                <input
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 shadow-inner"
                />
              </div>

              {/* PRODUCT */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Product</label>
                <input
                  value={product.name}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 shadow-inner"
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Price</label>
                <input
                  value={`$${product.price}`}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 shadow-inner"
                />
              </div>

              {/* FIRST NAME */}
              <div>
                <label className="text-sm font-semibold mb-1 block">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  focus:shadow-md hover:shadow-md hover:-translate-y-[1px] transition duration-200"
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  focus:shadow-md hover:shadow-md hover:-translate-y-[1px] transition duration-200"
                />
              </div>

              {/* QUANTITY */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Quantity (Min {product.moq} - Max {product.quantity})
                </label>
                <input
                  type="number"
                  min={product.moq}
                  max={product.quantity}
                  {...register("quantity", { required: true })}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  focus:shadow-md hover:border-indigo-400 hover:shadow-md hover:-translate-y-[1px] transition"
                />
              </div>

              {/* TOTAL PRICE */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Total Price</label>
                <input
                  value={`$${totalPrice}`}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-700 font-bold shadow-inner"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Contact Number</label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  focus:shadow-md hover:shadow-md hover:-translate-y-[1px] transition"
                />
              </div>

            </div>

            {/* ADDRESS */}
            <div className="mt-6">
              <label className="text-sm font-semibold mb-1 block">Delivery Address</label>
              <textarea
                rows="3"
                {...register("address", { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                focus:shadow-md transition resize-none"
              />
            </div>

            {/* NOTES */}
            <div className="mt-4">
              <label className="text-sm font-semibold mb-1 block">Additional Notes</label>
              <textarea
                rows="2"
                {...register("notes")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                focus:shadow-md transition resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 
              text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              Confirm Booking
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;