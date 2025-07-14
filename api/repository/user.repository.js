import User from "../models/user.model.js";

class UserRepository{
 
    async createUser(userData) {
  try {
    const result = await User.updateOne(
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

}

export default UserRepository