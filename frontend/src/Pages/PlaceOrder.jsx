import React, { useState } from "react";
import CartTotal from "../components/GetCartTotal/CartTotal";
import { SiRazorpay } from "react-icons/si";
import { FaStripe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const { navigate, backendUrl, cartItems, setCartItems, token, products, getCartTotalAmount, currency, deliveryFee } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //initPay 
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Anitha Ecommerce',
      description: 'Payment for order',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/orders/verify-payment`,
            response,
            { headers: { authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            alert(data.message);
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          alert(error.response?.data?.message || "Failed to verify payment");
        }
      }


    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = products.find((p) => p._id === productId);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size,
                quantity: cartItems[productId][size],
              });
            }
          }
        }
      }

      const orderData = {
        items: orderItems,
        amount: getCartTotalAmount() + deliveryFee,
        address: formData,
      };
  

      //payment sections

      switch (method) {
        case "COD":
          const response = await axios.post(
            backendUrl + "/api/orders/cod-order",
            orderData,
            { headers: { authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            alert(response.data.message);
            setCartItems({});
            navigate("/orders");
          } else {
            alert(response.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/orders/razorpay-order`,
            orderData,
            { headers: { authorization: `Bearer ${token}` } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

          break;

        default:
          return;
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    }
  };


  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 px-6 sm:px-10 lg:px-20 py-10 min-h-screen">
      <form
        onSubmit={onHandleSubmit}
        className="flex flex-col lg:flex-row justify-between gap-10 w-full"
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="flex-1 h-auto shadow-lg items-center justify-center rounded-2xl p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 uppercase">
            Delivery Information
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="First Name"
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />

            <input
              type="text"
              placeholder="Street Address"
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <input
                type="text"
                placeholder="State"
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Zipcode"
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <input
                type="text"
                placeholder="Country"
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <input
              type="number"
              placeholder="Phone Number"
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex flex-col flex-1 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <CartTotal />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase border-b pb-2">
              Payment Method
            </h2>

            <div className="flex flex-col lg:flex-row gap-4">
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer transition-all ${method === "razorpay"
                  ? "border-violet-600 bg-violet-50 shadow-md"
                  : "hover:border-violet-400"
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-violet-600" : ""
                    }`}
                ></span>
                <SiRazorpay size={24} color="#7c3aed" />
                <p className="font-medium">Razorpay</p>
              </div>

              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer transition-all ${method === "stripe"
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "hover:border-blue-400"
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${method === "stripe" ? "bg-blue-600" : ""
                    }`}
                ></span>
                <FaStripe size={24} color="#2563eb" />
                <p className="font-medium">Stripe</p>
              </div>

              <div
                onClick={() => setMethod("COD")}
                className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer transition-all ${method === "COD"
                  ? "border-green-600 bg-green-50 shadow-md"
                  : "hover:border-green-400"
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${method === "COD" ? "bg-green-600" : ""
                    }`}
                ></span>
                <p className="font-medium text-gray-800">Cash on Delivery</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-full font-semibold text-lg shadow-md transition-all"
          >
            Place Order →
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
