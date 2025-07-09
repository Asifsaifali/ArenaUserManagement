import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
bot.setWebHook(`${process.env.TELEGRAM_WEBHOOK_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`);

export default bot;
