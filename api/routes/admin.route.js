import { createAdmin } from "../controllers/admin.controller.js";
import express from "express";

const router = express.Router();

router.post("/signin", createAdmin)

export default router;

