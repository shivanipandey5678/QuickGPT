import {register ,login ,getAllUser,getPublishedImages} from '../controllers/User.Controller.js'
import express from 'express';
const UserRouter = express.Router();
import { authMiddleware } from '../middleware/Auth.js';

UserRouter.post('/register',register);
UserRouter.post('/login',login);
UserRouter.get('/all-users',authMiddleware,getAllUser);
UserRouter.get('/published-images',getPublishedImages);


export default UserRouter;