import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import {
  createShiprocketOrder,
  trackShiprocketOrder,
  getShiprocketOrderDetails,
} from "../utils/shiprocket.js";

const currency = "INR";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRETE,
});

// Helper to calculate item subtotal (excludes delivery fee)
const calculateItemsSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// COD order
const codOrder = async (req, res) => {
  let newOrder = null;
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    // Validate address fields
    if (!address.pincode || !/^\d{6}$/.test(String(address.pincode))) {
      return res
        .status(400)
        .json({ success: false, message: "Valid 6-digit pincode is required" });
    }
    if (!address.phone || !/^\d{10}$/.test(String(address.phone))) {
      return res.status(400).json({
        success: false,
        message: "Valid 10-digit phone number is required",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "order_placed",
      PaymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    newOrder = new orderModel(orderData);
    await newOrder.save();

    const itemsSubtotal = calculateItemsSubtotal(items);
    const shiprocketPayload = {
      order_id: newOrder._id.toString(),
      order_date: new Date().toISOString().split("T")[0],
      pickup_location: "Shop",
      billing_customer_name: address.firstName,
      billing_last_name: address.lastName || "",
      billing_address: address.street,
      billing_city: address.city,
      billing_pincode: String(address.pincode),
      billing_state: address.state,
      billing_country: "India",
      billing_email: address.email,
      billing_phone: String(address.phone),
      shipping_is_billing: true,
      order_items: items.map((item) => ({
        name: item.name,
        sku: String(item._id),
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "COD",
      sub_total: itemsSubtotal,
      length: 10,
      weight: 0.5,
      height: 10,
      breadth: 10,
    };

    const shiprocketResponse = await createShiprocketOrder(shiprocketPayload);

    // ✅ Fetch full order details to get AWB (if available)
    if (shiprocketResponse && shiprocketResponse.order_id) {
      try {
        const orderDetails = await getShiprocketOrderDetails(shiprocketResponse.order_id);
        if (orderDetails.awb_code) {
          newOrder.awbCode = orderDetails.awb_code;
          newOrder.courierName = orderDetails.courier_name || null;
          await newOrder.save();
          console.log(`✅ AWB ${newOrder.awbCode} assigned for order ${newOrder._id}`);
        } else {
          console.warn(`⚠️ No AWB yet for order ${newOrder._id}. Awaiting courier assignment.`);
        }
      } catch (detailsError) {
        console.error("Failed to fetch Shiprocket order details:", detailsError);
        // Don't delete the order; user can check tracking later
      }
    } else {
      console.warn(`⚠️ Shiprocket order creation may have failed for order ${newOrder._id}`);
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData: {} } },
      { new: true },
    );
    res.json({ success: true, message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("COD Order Error:", error);
    if (newOrder && newOrder._id) {
      await orderModel
        .findByIdAndDelete(newOrder._id)
        .catch((e) => console.error("Cleanup delete failed:", e));
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Razorpay order (no Shiprocket call yet)
const razorpayOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "order_placed",
      PaymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order, newOrder });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay payment and create Shiprocket order
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const userId = req.userId;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.json({ success: false, message: "Payment not verified" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderInfo.receipt,
      { payment: true },
      { new: true },
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const addr = updatedOrder.address;
    if (!addr.pincode || !/^\d{6}$/.test(String(addr.pincode))) {
      return res
        .status(400)
        .json({ success: false, message: "Order has invalid pincode" });
    }
    if (!addr.phone || !/^\d{10}$/.test(String(addr.phone))) {
      return res
        .status(400)
        .json({ success: false, message: "Order has invalid phone number" });
    }

    const itemsSubtotal = calculateItemsSubtotal(updatedOrder.items);
    const shiprocketPayload = {
      order_id: updatedOrder._id.toString(),
      order_date: new Date().toISOString().split("T")[0],
      pickup_location: "Shop",
      billing_customer_name: addr.firstName,
      billing_last_name: addr.lastName || "",
      billing_address: addr.street,
      billing_city: addr.city,
      billing_pincode: String(addr.pincode),
      billing_state: addr.state,
      billing_country: "India",
      billing_email: addr.email,
      billing_phone: String(addr.phone),
      shipping_is_billing: true,
      order_items: updatedOrder.items.map((item) => ({
        name: item.name,
        sku: String(item._id),
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "Prepaid",
      sub_total: itemsSubtotal,
      length: 10,
      weight: 0.5,
      height: 10,
      breadth: 10,
    };

    const shiprocketResponse = await createShiprocketOrder(shiprocketPayload);

    // ✅ Fetch full order details to get AWB (if available)
    if (shiprocketResponse && shiprocketResponse.order_id) {
      try {
        const orderDetails = await getShiprocketOrderDetails(shiprocketResponse.order_id);
        if (orderDetails.awb_code) {
          updatedOrder.awbCode = orderDetails.awb_code;
          updatedOrder.courierName = orderDetails.courier_name || null;
          await updatedOrder.save();
          console.log(`✅ AWB ${updatedOrder.awbCode} assigned for order ${updatedOrder._id}`);
        } else {
          console.warn(`⚠️ No AWB yet for order ${updatedOrder._id}. Awaiting courier assignment.`);
        }
      } catch (detailsError) {
        console.error("Failed to fetch Shiprocket order details:", detailsError);
      }
    } else {
      console.warn(`⚠️ Shiprocket order creation may have failed for order ${updatedOrder._id}`);
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData: {} } },
      { new: true },
    );

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders (admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User orders
const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID and status are required" });
    }
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true },
    );
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: "Status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🆕 Track order by ID using stored AWB code
const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    // Find the order (ensure it belongs to the logged-in user)
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Check if the logged-in user owns this order (or is admin)
    if (order.userId !== userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // If no AWB code available yet
    if (!order.awbCode) {
      return res.status(404).json({
        success: false,
        message: "Tracking information not available yet. Please check back later.",
      });
    }

    // Fetch live tracking from Shiprocket
    const trackingData = await trackShiprocketOrder(order.awbCode);

    // Optionally update the local tracking history
    if (trackingData.tracking_details && trackingData.tracking_details.length > 0) {
      order.trackingHistory = trackingData.tracking_details;
      await order.save();
    }

    res.json({
      success: true,
      tracking: trackingData,
      awbCode: order.awbCode,
      courierName: order.courierName,
    });
  } catch (error) {
    console.error("Track Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  codOrder,
  razorpayOrder,
  allOrders,
  userOrder,
  updateOrderStatus,
  verifyPayment,
  trackOrder
};
