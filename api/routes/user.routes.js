import { bulkInsertUsers, TotalUsers, getTotalaUsers, fetchLatestUsers, MonthlyUsersStats, getGraphData } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get('/users', getTotalaUsers);
router.get('/active-users', TotalUsers); // Assuming this is the same controller for active users
router.post('/all-users', bulkInsertUsers); 
router.get('/total-users', getTotalaUsers); 
router.get('/latest-users', fetchLatestUsers);
router.get('/monthly-users-stats', MonthlyUsersStats);
router.get('/graph-data',getGraphData)

export default router;