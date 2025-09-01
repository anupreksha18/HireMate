import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

export const auth =asyncHandler(async(req,res,next)=>{
    const token=req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        throw new ApiError(401,'No token provided');
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select('-password -refreshToken');  
        if(!user){
            throw new ApiError(404,'User not found');
        }
        req.user= user;
        next();
    }catch (err){
        throw new ApiError(401,'Invalid token');    
    }
});