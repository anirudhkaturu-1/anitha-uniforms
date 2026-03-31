import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const LoadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/orders/user-order`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const allOrders = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrders.push({
              ...item,
              orderId: order._id,
              userId: order.userId,
              orderDate: order.date,
              status: order.status,
              paymentMethod: order.PaymentMethod || order.paymentMethod,
            });
          });
        }); 

        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    LoadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-6 sm:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Orders</h2>

      <div className="flex flex-col gap-6">
        {orderData.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between gap-5 bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-5 border border-gray-100"
            >
              {/* Left Section */}
              <div className="flex items-start gap-5">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-800">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {currency}
                      {item.price}
                    </p>
                    {item.size && (
                      <>
                        <span className="text-gray-400">|</span>
                        <p>
                          Size:{" "}
                          <span className="font-medium text-gray-700">
                            {item.size}
                          </span>
                        </p>
                      </>
                    )}
                    {item.quantity && (
                      <>
                        <span className="text-gray-400">|</span>
                        <p>
                          Quantity:{" "}
                          <span className="font-medium text-gray-700">
                            {item.quantity}
                          </span>
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Ordered on:{" "}
                    <span className="text-gray-700 font-medium">
                      {new Date(item.orderDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Payment-Method:{" "}
                    <span className="text-gray-700 font-medium">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col md:flex-row items-center justify-end gap-3">
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm text-green-700 font-medium">
                    {item.status || "Processing"}
                  </p>
                </div>
                <button className="px-4 py-1.5 bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium rounded-full shadow-sm transition-all">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
