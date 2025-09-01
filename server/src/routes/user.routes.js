import {registerUser, loginUser, getUserProfile,logoutUser} from '../controllers/user.controller.js';
import {auth} from '../middlewares/auth.middleware.js';
import Router from 'express';

const route=Router();

route.post('/register',registerUser);
route.post('/login',loginUser);
route.post('/logout',auth,logoutUser);
route.get('/profile',auth,getUserProfile);

export default route;