import express from "express";
import{codOrder,razorpayOrder,allOrders,userOrder,updateOrderStatus,verifyPayment} from '../controllers/orderController.js'
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";


const orderRouter = express.Router();

//Admin Routes
orderRouter.get('/all-orders',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateOrderStatus);

//Payment Routes

orderRouter.post('/cod-order',authUser,codOrder);
orderRouter.post('/razorpay-order',authUser,razorpayOrder);
orderRouter.post('/verify-payment',authUser,verifyPayment);


//User Routes orders
orderRouter.get('/user-order',authUser,userOrder);

export default orderRouter