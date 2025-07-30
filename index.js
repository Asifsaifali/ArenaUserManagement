import express from 'express';
import dotenv from 'dotenv';
import connectDB from './api/config/database.config.js';
import webhookRoute from './api/routes/telegram.route.js'
import cors from 'cors';
import userRoutes from "./api/routes/user.routes.js"
import AdminRoutes from "./api/routes/admin.route.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", 
    credentials: true,
  })
);


app.use("/",webhookRoute)
app.use("/api/v1/", userRoutes);
app.use("/api/v1/admin", AdminRoutes);
connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Bot server running on port ${PORT}`);
});
