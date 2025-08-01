import { createAdmin, adminLogin } from "../controllers/admin.controller.js";
import express from "express";

const router = express.Router();

router.post("/signin", createAdmin)
router.post("/login", adminLogin)

export default router;

