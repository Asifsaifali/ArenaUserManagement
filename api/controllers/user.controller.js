import UserRepository from "../repository/user.repository.js"
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
const userRepository = new UserRepository();

const Member = async (data) => {
  try {

    for(const member of data.message.new_chat_members){
        const userId = member.id;
        const fullName = `${member.first_name} ${member.last_name || ""}`;
        const username = member.username || "anonymous";
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
      }
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




export { Member}
