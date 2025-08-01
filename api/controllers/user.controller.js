import UserRepository from "../repository/user.repository.js";
import dotenv from "dotenv";
dotenv.config();

const userRepository = new UserRepository();

export const insertNewUser = async (member, chatId) => {
  try {
    const userId = member.id;
    const username = member.username || "anonymous";
    const subscriptionDate = new Date();
    const subscriptionEndDate = new Date(subscriptionDate);
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);

    const timeDiff = subscriptionEndDate - subscriptionDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const userData = {
      chatId,
      userId,
      firstName: member.first_name,
      lastName: member.last_name || "",
      username,
      subscription: {
        startDate: subscriptionDate,
        endDate: subscriptionEndDate,
        status: "active",
        daysLeft,
        expired: false,
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
};



const getTotalaUsers = async(req,res)=>{
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
}


export { getTotalaUsers}