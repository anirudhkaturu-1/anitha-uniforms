import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const[Loading,setLoading]=useState(false)

  const statusHandler=async(orderId,e)=>{
    try {
        const response = await axios.post(`${backendUrl}/api/orders/status`,{orderId,status:e.target.value},{headers:{authorization:`Bearer ${token}`}})
        if(response.data.success){
            await fetchAllOrders();
        }else{
            alert(response.data.message)
        }
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Failed to update status");
        
    }
      
  }
  const fetchAllOrders = async () => {
    try {
setLoading(true)
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/orders/all-orders`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders || response.data.allOrders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }finally{
        setLoading(false)
    }   
    
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-violet-700 mb-10">
        All Orders
      </h1>

     
      {Loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="flex flex-col items-center">
            <div className="w-22 h-22 border-b-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-violet-700 font-medium text-base animate-pulse">
             PleaseWait Loading orders...
            </p>
          </div>
        </div>
       ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No orders available yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-violet-700 font-bold">
                      {order._id}
                    </span>
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Customer:{" "}
                    <span className="font-medium text-gray-800">
                      {order.address.firstName} {order.address.lastName}
                    </span>
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="mt-4 md:mt-0">
                  <label className="text-sm text-gray-600 mr-2 font-medium">
                    Status:
                  </label>
                  <select
                    onChange={(e) => statusHandler(order._id,e)}
                    defaultValue={order.status}
                    className="border rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="order_placed">Order Placed</option>
                    <option value="packing">Packing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ₹{item.price} | Size: {item.size} | Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Address */}
              <div className="grid sm:grid-cols-2 gap-6 border-t pt-4 text-gray-700">
                {/* Payment Details */}
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Payment Method:
                    </span>{" "}
                    {order.PaymentMethod}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Payment Status:
                    </span>{" "}
                    {order.payment ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not Paid</span>
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Amount:</span>{" "}
                    ₹{order.amount}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Date:</span>{" "}
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">
                    Shipping Address:
                  </p>
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}{" "}
                    {order.address.zipcode}
                  </p>
                  <p>{order.address.country}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
