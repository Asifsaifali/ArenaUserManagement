

const TelegramNewMember = async (req, res) => {
  try {
    const update = req.body;
    console.log("✅ Received update:", update);

    if (update.message && update.message.text) {
      console.log("📩 Group message received:", update.message.text);
    }

    if (update.message && update.message.new_chat_members) {
      const chatId = update.message.chat.id;

      for (const member of update.message.new_chat_members) {
        const name = `${member.first_name || ""} ${
          member.last_name || ""
        }`.trim();
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

        const result = await response.json();
        console.log("📩 Message sent:", result);
      }
    }

    if (update.message && update.message.left_chat_member) {
  const member = update.message.left_chat_member;
  const chatId = update.message.chat.id;

  console.log('👋 Member left:', {
    userId: member.id,
    username: member.username,
    fullName: `${member.first_name || ''} ${member.last_name || ''}`.trim(),
    chatId,
  });

  // Optional: Send message to group
  const goodbyeMessage = `👋 ${member.first_name || member.username} has left the group.`;
  
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: goodbyeMessage,
    }),
  });
}

    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      message: "Something error in telegram controller",
      success: false,
      error: {},
    });
  }
};

export default TelegramNewMember