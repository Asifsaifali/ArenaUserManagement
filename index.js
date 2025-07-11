// server.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

app.use(express.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  const update = req.body;
  console.log('✅ Received update:', update);

  if (update.message && update.message.text) {
    console.log('📩 Group message received:', update.message.text);
  }

  if (update.message && update.message.new_chat_members) {
    const chatId = update.message.chat.id;

    for (const member of update.message.new_chat_members) {
      const name = `${member.first_name || ''} ${member.last_name || ''}`.trim();
      const username = member.username || '(no username)';
      const userId = member.id;

      const welcomeMessage = `👋 Welcome ${name} (@${username})!\n🆔 ID: ${userId}`;

      const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeMessage,
        }),
      });

      const result = await response.json();
      console.log('📩 Message sent:', result);
    }
  }

  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bot server running on port ${PORT}`);
});
