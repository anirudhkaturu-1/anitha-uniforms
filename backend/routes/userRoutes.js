 import express from 'express';
 import{signup,login,adminLogin,getUserName} from '../controllers/userController.js'
import authUser from '../middlewares/auth.js';



const userRouter = express.Router();



userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/admin-login',adminLogin);
userRouter.get('/username',authUser,getUserName);


export default userRouter;