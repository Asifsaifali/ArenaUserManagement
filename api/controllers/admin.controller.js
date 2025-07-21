import AdminRepository from "../repository/admin.repository.js";
import { hashPassword } from "../utils/index.js";
const adminRepository = new AdminRepository();


const createAdmin = async(req,res)=>{
    try {

        const hashPass = await hashPassword(req.body.password)
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
            email: req.body.email
        }
        const admin = await adminRepository.crateAdmin(data)
        res.status(201).json({
            message: "Admin created successfully",  
            success: true,
            data: admin
        });
    } catch (error) {
        console.log("Error in Controller while creating admin:", error);
        res.status(500).json({ 
            message: "Failed to create admin",
            success : false
        });
    }
}

export { createAdmin }