import express from "express"
import TelegramNewMember from "../controllers/telegram.controller.js"
import  UserDetails  from "../controllers/user.controller.js"
const router = express.Router()

router.post('/webhook',UserDetails, TelegramNewMember)

export default router;

