import VipMember from "../models/user.model.js";

class UserRepository {
  async createUser(userData) {
    try {
      const result = await VipMember.updateOne(
        { chatId: userData.chatId, userId: userData.userId },
        {
          $setOnInsert: {
            name: userData.name,
            username: userData.username,
            joinedAt: new Date(),
          },
        },
        { upsert: true }
      );

      if (result.upserted) {
        console.log("✅ New user inserted:", userData.username);
      } else {
        console.log("ℹ️ User already exists:", userData.username);
      }

      return result;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw new Error("Failed to create or update user");
    }
  }


  async getTotalUsers() {
    try {
        const admin = await VipMember.find();
        return admin
    } catch (error) {
      console.log("❌ Error fetching total users:", error);
      throw new Error("Failed to fetch total users");
    }
  
  }

  async TotalUsers(){
    try {
      const user = await VipMember.countDocuments({}, )
      return user;
    } catch (error) {
      console.error("❌ Error fetching total users:", error);
      throw new Error("Failed to fetch total users");
      
    }
  }
}

export default UserRepository;
