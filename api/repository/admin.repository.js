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


    async adminLogin(email) {
        try {
            const admin = await Admin.findOne({email: email});
            return admin;
        } catch (error) {
            console.log("Error in Repository while logging in admin:", error);
            throw new Error("Failed to login admin");           
        }
}

async getAdmin(){
    try {
        const admin = await Admin.findOne()
        
    } catch (error) {
       console.log("Error in Repository while logging in admin:", error);
            throw new Error("Failed to login admin");        
    }
}
}


export default AdminRepository;