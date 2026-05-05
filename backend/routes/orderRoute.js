import express from "express";
import {
  codOrder,
  razorpayOrder,
  allOrders,
  userOrder,
  updateOrderStatus,
  verifyPayment,
  trackOrder, // ✅ import the new controller
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.get("/all-orders", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment Routes
orderRouter.post("/cod-order", authUser, codOrder);
orderRouter.post("/razorpay-order", authUser, razorpayOrder);
orderRouter.post("/verify-payment", authUser, verifyPayment);

// User Routes
orderRouter.get("/user-order", authUser, userOrder);

// ✅ Tracking Route (authenticated user can track their own order)
orderRouter.get("/track/:orderId", authUser, trackOrder);

export default orderRouter;
