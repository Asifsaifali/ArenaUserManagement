import express from 'express'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()

const bot_token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(bot_token, { polling : true})

bot.on('message', (msg)=>{
    msg.new_chat_members.forEach((members)=>{
        const chatId = msg.chat.id
        const welcomeMessage = `Welcome to the group, ${members.first_name}`
        const first_name = members.first_name
        const last_name = members.last_name ? members.last_name : 'Anonymous'
        const username = members.username ? `@${members.username}` : 'No username'

        console.log(`New member joined: ${first_name}`)
        console.log(`Last name ${last_name}`);
        console.log(`Username: ${username}`);
        bot.sendMessage(chatId, welcomeMessage);
        
    })
})

bot.getChatMember(chatId, userId).then((members)=>{
    const user = members.user
    console.log(`User ID: ${user.id}`);
    console.log(`User First Name: ${user.first_name}`);
    console.log(`User Last Name: ${user.last_name || 'No last name'}`);
    console.log(`User Username: ${user.username || 'No username'}`);
})

const app = express()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})