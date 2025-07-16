import { insertNewUser } from "./user.controller.js";
import dotenv from "dotenv";
dotenv.config();

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

const TelegramNewMember = async (req, res) => {
  try {
    const update = req.body;

    if (update.message?.text) {
      console.log("📩 Group message:", update.message.text);
    }

    if (update.message?.new_chat_members) {
      const chatId = update.message.chat.id;

      for (const member of update.message.new_chat_members) {
        await insertNewUser(member, chatId);
        const name = `${member.first_name || ""} ${member.last_name || ""}`.trim();
        const username = member.username || "(no username)";
        const userId = member.id;

        const welcomeMessage = `👋 Welcome ${name} (@${username})!\n🆔 ID: ${userId}`;

        const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMessage,
          }),
        });

       await response.json();
      }
    }

    if (update.message?.left_chat_member) {
      const member = update.message.left_chat_member;
      const chatId = update.message.chat.id;

      const goodbyeMessage = `👋 ${member.first_name || member.username} has left the group.`;

      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: goodbyeMessage,
        }),
      });

      console.log("👋 Member left:", {
        userId: member.id,
        username: member.username,
        chatId,
      });
    }
  } catch (error) {
    console.error("❌ Telegram controller error:", error);
  } finally {
    res.sendStatus(200); // ✅ Always send 200 to Telegram
  }
};

export default TelegramNewMember;
