import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://bipasha:bipasha@school-management.qzifp.mongodb.net/?retryWrites=true&w=majority&appName=school-management"; ;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
