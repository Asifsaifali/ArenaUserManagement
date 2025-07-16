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
      },
    };

    await userRepository.createUser(userData);
    console.log("✅ New User inserted:", userData);
  } catch (err) {
    if (err.code === 11000) {
      console.log("⚠️ User already exists:", member.id);
    } else {
      console.error("❌ DB Insert Error:", err);
    }
  }
};
