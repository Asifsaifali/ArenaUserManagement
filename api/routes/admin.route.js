import { createAdmin, adminLogin, getAdminProfile } from "../controllers/admin.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import express from "express";

const router = express.Router();

router.post("/signup",createAdmin)
router.post("/login", adminLogin)
router.get("/admin-details",verifyAdmin, getAdminProfile)
export default router;

