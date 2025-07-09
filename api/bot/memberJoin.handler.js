import bot from "./index.js";
import UserRepository from "../repository/user.repository.js";

const userRepository = new UserRepository();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.new_chat_members) {
    for (const member of msg.new_chat_members) {
      const subscriptionDate = new Date();
      const subscriptionEndDate = new Date(subscriptionDate);
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
      const userData = {
        chatId: msg.chat.id,
        userId: member.id,
        firstName: member.first_name,
        lastName: member.last_name || "",
        username: member.username || "anonymous",
        subscription: {
          startDate: subscriptionDate,
          endDate: subscriptionEndDate,
          status: "active",
        },
      };

      console.log(
        `🟢 New member joined: ${userData.firstName} ${userData.lastName}`
      );
    }
    try {
      await userRepository.createUser(userData);
      bot.sendMessage(
        chatId,
        `👋Welcome ${member.first_name} to Our official Group!`
      );
    } catch (err) {
      console.error("❌ DB error:", err.message);
    }
  }
});
