


import userModel from "../models/userModel.js";

// Add to cart

const addToCart = async (req, res) => {
  try {
    const userId = req.userId; //  From auth middleware
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Remove from cart

const removeFromCart = async (req, res) => {
 try {
    const userId = req.userId; //  From auth middleware
    const{itemId,size,quantity}=req.body
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

  if (quantity > 0) {
      if (cartData[itemId]) {
        cartData[itemId][size] = quantity;
      }
    } 
    else {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }
    await userModel.findByIdAndUpdate(userId,{cartData:cartData},{new:true})
    res.json({success:true,message:"Item removed from cart"})
    
 } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message})
 }
}



// Get cart items
const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData; // no await needed
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { addToCart, removeFromCart, getCartItems }    