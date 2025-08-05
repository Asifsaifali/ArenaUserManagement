import UserRepository from "../repository/user.repository.js";
import VipMember from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const userRepository = new UserRepository();

export const insertNewUser = async (member, chatId) => {
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ Running daily subscription update...");

    try {
      const userId = member.id;
      const username = member.username || "anonymous";
      const firstName = member.first_name || "Guest";
      const lastName = member.last_name || "";

      const subscriptionDate = new Date();
      const subscriptionEndDate = new Date(subscriptionDate);
      subscriptionEndDate.setDate(subscriptionEndDate.getDate());

      // Strip time for exact day calculation
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      subscriptionEndDate.setHours(0, 0, 0, 0);

      const timeDiff = subscriptionEndDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const isExpired = daysLeft <= 0;

      const userData = {
        chatId,
        userId,
        firstName,
        lastName,
        username,
        subscription: {
          startDate: subscriptionDate,
          endDate: subscriptionEndDate,
          status: isExpired ? "expired" : "active",
          daysLeft: daysLeft > 0 ? daysLeft : 0,
          expired: isExpired,
        },
      };

      await userRepository.createUser(userData);
      console.log("✅ New Member inserted in db:", userData);
    } catch (err) {
      if (err.code === 11000) {
        console.log("⚠️ User already exists:", member.id);
      } else {
        console.error("❌ DB Insert Error:", err);
      }
    }
  });
};

const bulkInsertUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ message: "Expected an array of users" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all userIds from incoming data
    const incomingUserIds = users.map((u) => u.userId);
    const existingUsers = await VipMember.find({
      userId: { $in: incomingUserIds },
    });
    const existingUserIdSet = new Set(existingUsers.map((u) => u.userId));

    const filteredUsers = users
      .filter((u) => !existingUserIdSet.has(u.userId)) 
      .map((user) => {
        const endDate = new Date(user.subscription.endDate);
        endDate.setHours(0, 0, 0, 0);
        const diff = endDate - today;
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const isExpired = daysLeft <= 0;

        return {
          ...user,
          subscription: {
            ...user.subscription,
            daysLeft: isExpired ? 0 : daysLeft,
            expired: isExpired,
            status: isExpired ? "expired" : "active",
          },
        };
      });

    if (filteredUsers.length === 0) {
      return res
        .status(200)
        .json({ message: "All users were duplicates. No data inserted." });
    }

    await VipMember.insertMany(filteredUsers, { ordered: false });
    res.status(201).json({
      message: `Inserted ${filteredUsers.length} users successfully.`,
    });
  } catch (error) {
    console.error("❌ Bulk insert error:", error.message);
    res
      .status(500)
      .json({ message: "Bulk insert failed", error: error.message });
  }
};

const getTotalaUsers = async (req, res) => {
  try {
    const totalUsers = await userRepository.getTotalUsers();
    return res.status(200).json({
      success: true,
      totalUsers: totalUsers,
      message: "Total users fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching total users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch total users" });
  }
};

const TotalUsers = async (req, res) => {
  try {
    const totalUsers = await userRepository.TotalUsers();
    return res.status(200).json({
      success: true,
      totalUsers: totalUsers,
      message: "Total users fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching total users:", error);
    throw new Error("Failed to fetch total users");
  }
};

const fetchLatestUsers = async (req, res) => {
  try {
    const latestUsers = await userRepository.fetchLatestUsers();
    return res.status(200).json({
      success: true,
      latestUsers: latestUsers,
      message: "Latest users fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching latest users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch latest users" });
  }
};

const MonthlyUsersStats = async (req, res) => {
  try {
    const { thisMonthCount, lastMonthCount } =
      await userRepository.MonthlyUsersStats();

    res.json({
      thisMonthCount,
      lastMonthCount,
    });
  } catch (error) {
    console.error("Error fetching monthly user stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGraphData = async (req, res) => {
  try {
    const graphData = await userRepository.getGraphUserStats();
    res.status(200).json(graphData);
  } catch (error) {
    console.error("Error in getGraphData:", error);
    res.status(500).json({ message: "Failed to fetch graph data" });
  }
};

export {
  TotalUsers,
  getTotalaUsers,
  bulkInsertUsers,
  fetchLatestUsers,
  MonthlyUsersStats,
  getGraphData,
};
