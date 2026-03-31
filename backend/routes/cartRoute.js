// backend/routes/cartRoute.js
import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authUser, addToCart);
cartRouter.post("/update", authUser, removeFromCart);
cartRouter.get("/get-cart-items", authUser, getCartItems);

export default cartRouter;
