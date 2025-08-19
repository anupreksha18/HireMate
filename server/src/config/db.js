import mongoose from "mongoose";

export const connectDb=async(url)=>{
    if(!url){
        throw new Error("Database URL is not provided");
    }
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}