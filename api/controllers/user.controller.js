import UserRepository from "../repository/user.repository.js"
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
const userRepository = new UserRepository();

const UserDetails = async (req, res, next) => {
  try {
     const data = req.body
     const chatId = data.message.chat.id
    for(const member of data.message.new_chat_members){
        const userId = member.id;
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
        if (!newUser) 
         console.log("🔴Error creating user in the database");
        console.log("New User data inserted in db: ",userData);
        res.sendStatus(200)
        next();
      }
  } catch (error) {
    console.log("🔴Error setting up Telegram new member handler:", error);
  }
};




export default UserDetails 
