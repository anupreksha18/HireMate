import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

import {ApiError} from '../utils/ApiError.js';


const generateAccessAndRefreshTokens=async (userId)=>{
    try{
        const user=await User.findById(userId);
    const accessToken=user.generateJWT();
    const refreshToken=user.generateRefreshToken();

    user.refreshToken=refreshToken;
    await user.save({validatateBeforeSave:false});
    return {accessToken,refreshToken};
    }
    catch(error){
        throw new ApiError(500,'Error generating tokens');
    }
}

//Register a new user
export const registerUser=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;

    if(
        [name,email,password].some((field)=>field.trim()==='')
    )
    {
        return next(new ApiError('Fields cannot be empty',400));
    }

    //check if user already exists
    const existingUser=await User.findOne({email});
    if(existingUser){
        return next(new ApiError('User already exists',400));
    }
    const user=await User.create(
        {name,email,password}
    );

    //generate JWT
    const token=user.generateJWT();
    return res.
    status(201).json(new ApiResponse(201,{id:user._id,email:user.email,token},'User registered successfully'))

});

//Login user
export const loginUser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
        throw new ApiError('Email and password are required',400);
    }
    const user=await User.findOne({email}).select('+password');
    if(!user || !(await user.isPasswordCorrect(password))){
        throw new ApiError('Invalid email or password',401);
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);
//     const token=user.generateJWT();
//     return res.status(200).json(new ApiResponse(200,{id:user._id,email:user.email,token},'User logged in successfully'));
// })
User.findById(user._id).select('-password -refreshToken');

const options={
    http:true,
    secure:true
}
return res.status(200).cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(new ApiResponse(200,
    {id:user._id,email:user.email,accessToken,refreshToken}
    ,'User logged in successfully'));
});

//logout user

export const logoutUser=asyncHandler(async(req,res,next)=>{
  User.findByIdAndUpdate(req.user._id,
    {
        $set:{refreshToken:undefined}
    }
,{new:true}
);
const options={
    http:true,
    secure:true,
    expires:new Date(Date.now())
}
return res.status(200).clearCookie("accessToken","",options)
.clearCookie("refreshToken","",options)
.json(new ApiResponse(200,{},"User logged out successfully"));
});
   
//Get user profile

export const getUserProfile=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('-password');
    if(!user){
        return next(new ApiError('User not found',404));
    }
    return res.status(200).json(new ApiResponse(200,user,'User profile retrieved successfully'));
})