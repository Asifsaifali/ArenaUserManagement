import VipMember from "../models/user.model.js";

class UserRepository {
  async createUser(userData) {
    try {
      const result = await VipMember.updateOne(
        { chatId: userData.chatId, userId: userData.userId },
        {
          $setOnInsert: {
            name: userData.name,
            username: userData.username,
            joinedAt: new Date(),
          },
        },
        { upsert: true }
      );

      if (result.upserted) {
        console.log("✅ New user inserted:", userData.username);
      } else {
        console.log("ℹ️ User already exists:", userData.username);
      }

      return result;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw new Error("Failed to create or update user");
    }
  }
  async getTotalUsers() {
    try {
      const admin = await VipMember.find();
      return admin;
    } catch (error) {
      console.log("❌ Error fetching total users:", error);
      throw new Error("Failed to fetch total users");
    }
  }

  async TotalUsers() {
    try {
      const user = await VipMember.countDocuments({});
      return user;
    } catch (error) {
      console.error("❌ Error fetching total users:", error);
      throw new Error("Failed to fetch total users");
    }
  }

  async fetchLatestUsers() {
    try {
      const latestUsers = await VipMember.find()
        .sort({ createdAt: -1 })
        .limit(6);
      return latestUsers;
    } catch (error) {
      console.error("❌ Error fetching latest users:", error);
      throw new Error("Failed to fetch latest users");
    }
  }

  async MonthlyUsersStats() {
    try {
      const now = new Date();

      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      const endOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
        23,
        59,
        59,
        999
      );

      const thisMonthCount = await VipMember.countDocuments({
        createdAt: { $gte: startOfThisMonth, $lte: endOfThisMonth },
      });

      const lastMonthCount = await VipMember.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      });

      return { thisMonthCount, lastMonthCount };
    } catch (error) {
      console.error("❌ Error fetching latest users:", error);
      throw new Error("Failed to fetch latest users");
    }
  }

 async getGraphUserStats(req, res) {
  try {
    const allUsers = await VipMember.find();

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const activeUsers = Array(7).fill(0);
    const expiringUsers = Array(7).fill(0);
    const expiredUsers = Array(7).fill(0); // ✅ fix here: make it an array

    let activeCount = 0;
    let expiringSoonCount = 0;
    let expiredCount = 0;

    allUsers.forEach((user) => {
      const created = new Date(user.createdAt);
      const dayIndex = created.getDay();

      const daysLeft = user.subscription?.daysLeft ?? 0;
      const status = user.subscription?.status?.toLowerCase();

      if (status === "active") {
        activeUsers[dayIndex]++;
        activeCount++;

        // Consider expiring if <= 10 days left
        if (daysLeft > 0 && daysLeft <= 10) {
          expiringUsers[dayIndex]++;
          expiringSoonCount++;
        }
      }

      if (status === "expired") {
        expiredUsers[dayIndex]++; // ✅ fix here
        expiredCount++;
      }
    });

    return{
      weekly: {
        days,
        activeUsers,
        expiringUsers,
        expiredUsers,
      },
      summary: {
        active: activeCount,
        expiring: expiringSoonCount,
        expired: expiredCount,
      },
    };
  } catch (error) {
    console.error("Error in getGraphUserStats:", error);
    res.status(500).json({ message: "Failed to fetch graph data" });
  }
}

}

export default UserRepository;
