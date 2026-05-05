import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import { createShiprocketOrder } from "../utils/shiprocket.js";

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
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    // --- Validate address fields (especially pincode & phone) ---
    if (!address.pincode || !/^\d{6}$/.test(String(address.pincode))) {
      return res
        .status(400)
        .json({ success: false, message: "Valid 6-digit pincode is required" });
    }
    if (!address.phone || !/^\d{10}$/.test(String(address.phone))) {
      return res
        .status(400)
        .json({
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
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Prepare Shiprocket payload
    const itemsSubtotal = calculateItemsSubtotal(items);
    const shiprocketPayload = {
      order_id: newOrder._id.toString(),
      order_date: new Date().toISOString().split("T")[0],
      pickup_location: "Shop", // ⚠️ Verify this matches your Shiprocket pickup location name
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
        sku: String(item._id), // Convert ObjectId to string
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "COD",
      sub_total: itemsSubtotal, // Use subtotal without delivery fee
      length: 10,
      weight: 0.5,
      height: 10,
      breadth: 10,
    };

    // Call Shiprocket – will throw if fails
    await createShiprocketOrder(shiprocketPayload);

    // Clear cart only after Shiprocket success
    await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData: {} } },
      { new: true },
    );
    res.json({ success: true, message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("COD Order Error:", error);
    // If we saved the order but Shiprocket failed, delete the local order
    // (we can't recover because shipping creation failed)
    // Note: we don't have newOrder in scope if error happened before save, but in catch it's safe to try delete
    if (error.message?.includes("Shiprocket") && newOrder?._id) {
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

    // Update local DB
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

    // --- Validate address fields ---
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
      pickup_location: "Primary",
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

    // Create Shiprocket order – will throw on failure
    await createShiprocketOrder(shiprocketPayload);

    // Clear cart only after Shiprocket success
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

export {
  codOrder,
  razorpayOrder,
  allOrders,
  userOrder,
  updateOrderStatus,
  verifyPayment,
};
