import express from 'express';
import dotenv from 'dotenv';
import connectDB from './api/config/database.config.js';
import webhookRoute from './api/routes/telegram.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



app.use("/",webhookRoute)
connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Bot server running on port ${PORT}`);
});
