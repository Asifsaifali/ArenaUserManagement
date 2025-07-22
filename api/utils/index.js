import bcrypt from 'bcrypt';

const hashPassword = async(password)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch (error) {
        console.log("Error in hashing password:", error)
        throw new Error("Failed to hash password"            
        );
    }
}

export { hashPassword };