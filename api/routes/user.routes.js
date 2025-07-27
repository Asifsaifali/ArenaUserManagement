import { getTotalaUsers } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get('/users', getTotalaUsers);
router.get('/active-users', getTotalaUsers); // Assuming this is the same controller for active users


export default router;