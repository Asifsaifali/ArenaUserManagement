import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URI = process.env.MONGO_URI 

const connectDB = async()=>{
    const connect = await mongoose.connect(MONGO_URI)
    if(connect)
        console.log("🟢 MongoDB connected successfully");
    else
        console.log("🔴 MongoDB connection failed")
    return connect;
}

export default connectDB;