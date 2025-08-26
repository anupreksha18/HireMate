import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],    
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6,
        select:false, // Exclude password from queries by default
    },
    skills:{
        type:[String],
        default:[],
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    refreshToken:{
        type:String,
       
    },                                                                                                                                                                                                                                              
},{timestamps:true});

// Hash password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

//Compare password
userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password);
}

// Generate JWT token
userSchema.methods.generateJWT=function() {
    return jwt.sign({
  id:this._id,email:this.email
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_SECRET_EXPIRY,
    });
}
userSchema.methods.generateRefreshToken=function() {
     return jwt.sign({
  id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_SECRET_EXPIRY,
    });
}

export const User=mongoose.model('User',userSchema);