import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connections
connectDB();
connectCloudinary();

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter);
// Default route
app.get('/', (req, res) => res.send('API is working correctly'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
