import UserRepository from '../repositories/user.repository.js';

const userRepository =new UserRepository()

const createUser = async(req, res)=>{
    try {
        const subscriptionDate = new Date();
        const subscriptionEndDate = new Date(subscriptionDate)
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
        
        const userData = {
            chatId : req.body.chatId,
            userId : req.body.userId,
            firstName : req.body.firstName,
            lastName : req.body.lastName || '',
            username : req.body.username || 'anonymous',
            subscription: {
                startDate: subscriptionDate,
                endDate: subscriptionEndDate,
                status: 'active'
            }
        }
    } catch (error) {
        return res.status(500).json({
            message : "Error creating user",
            error: error.message,
            success : false
        })
    }
}