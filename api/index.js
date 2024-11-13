import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB.");
    } catch(err) {
        throw err;
    }
}

// middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(express.json()); // to pass a json object in the body and make requests

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

// error handler
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)
});