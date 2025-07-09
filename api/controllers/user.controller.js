import UserRepository from "../repository/user.repository.js"
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
const userRepository = new UserRepository();

const TelegramNewMember = async () => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(botToken, { polling: true });

    bot.on('polling_error', (error) => {
  console.error('⚠️ Polling error:', error.code, error.message);
});

    bot.on("new_chat_members", (msg) => {
      const chatId = msg.chat.id;

      msg.new_chat_members.forEach(async(member) => {
        const userId = member.id;
        const fullName = `${member.first_name} ${member.last_name || ""}`;
        const username = member.username || "anonymous";

        console.log(`🟢New member joined: ${fullName}`);
        console.log(`Username: @${username}`);
        console.log(`Chat ID: ${chatId}, User ID: ${userId}`);
        const subscriptionDate = new Date();
        const subscriptionEndDate = new Date(subscriptionDate);
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
        const userData = {
          chatId: chatId,
          userId: userId,
          firstName: member.first_name,
          lastName: member.last_name || "",
          username: username || "anonymous",
          subscription: {
            startDate: subscriptionDate,
            endDate: subscriptionEndDate,
            status: "active",
          },
        };

        const newUser = await userRepository.createUser(userData);
        if (!newUser) {
         console.log("🔴Error creating user in the database");
         ;
        }

        bot.sendMessage(chatId, `👋Welcome ${fullName}! to the Group`);
         console.log("🟢 Telegram new member handler is set up successfully");
      });
    });
    
   ;
  } catch (error) {
    console.log("🔴Error setting up Telegram new member handler:", error);
  }
};

const startBot = () => {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

    bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
      setTimeout(() => startBot(), 5000);
    });

  } catch (err) {
    console.error('Fatal bot error:', err);
    setTimeout(() => startBot(), 5000);
  }
};




export { TelegramNewMember}
