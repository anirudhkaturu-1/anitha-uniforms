import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";



//initializing payment  gateway
const currency="INR";
 const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRETE
 })


//cod order

const codOrder= async(req,res)=>{
    try {
        const userId = req.userId;
        const{items,amount,address}=req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            status:"order_placed",
            PaymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{$set:{cartData:{}}},{new:true})
        res.json({success:true,message:"Order placed successfully",newOrder})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }
}


//online order

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

    await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } }, { new: true });

    res.json({ success: true, order, newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//verify razorpay payment

const verifyPayment = async (req, res) => {
  try {
    const {  razorpay_order_id,  } = req.body;
    const userId = req.userId;
 const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
 if(orderInfo.status==="paid"){
  await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true},{new:true})
  await userModel.findByIdAndUpdate(userId,{$set:{cartData:{}}},{new:true})
  res.json({success:true,message:"Payment verified successfully"})
 }else{
  res.json({success:false,message:"Payment not verified"})
 }
  } catch (error) {
  console.log(error);
  res.status(500).json({success:false,message:error.message})
  }
};

//all the order in the database

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



//userOrder for frontend

const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }); // ✅ returns array
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update order status Admin

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status updated successfully", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export {codOrder,razorpayOrder,allOrders,userOrder,updateOrderStatus,verifyPayment}