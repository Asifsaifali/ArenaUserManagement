import express from "express"
import TelegramNewMember from "../controllers/telegram.controller.js"
const router = express.Router()

router.post('/webhook', TelegramNewMember)
export default router;

