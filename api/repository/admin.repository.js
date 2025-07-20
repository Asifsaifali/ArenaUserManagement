import Admin from "../models/admin.model.js";

class AdminRepository{


    async crateAdmin(data){
        try {
            const admin = await Admin.create(data)
            return admin;
        } catch (error) {
            console.log("Error in Repository while creating admin:", error);
            throw new Error("Failed to create admin");
        }
    }
}


export default AdminRepository;