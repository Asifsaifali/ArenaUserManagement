
const TelegramData = (req, res)=>{
    try {
    const update = req.body;
    if (update.message?.text) {
      console.log("📩 Group message from Telegram Bot:", update.message.text);
    }
        
    } catch (error) {
        console.log("Something went wrong at webhook");
    }

}


export default TelegramData;