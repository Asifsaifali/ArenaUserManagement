import User from "../models/user.model.js";

class UserRepository{
 
    async createUser(userData){
        try {
            const user =  await User.create(userData)
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }
}

export default UserRepository