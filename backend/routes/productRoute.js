import express  from 'express';
import { addProducts,listProducts,removeProducts,searchProducts,singleProducts } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';




const productRouter = express.Router();

   productRouter.post('/add-product',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProducts);
   productRouter.get('/list-product',listProducts);
   productRouter.delete('/remove-product/:id',adminAuth,removeProducts);
   productRouter.get('/single-product/:id',singleProducts);
   productRouter.get('/search',searchProducts);

export default productRouter
