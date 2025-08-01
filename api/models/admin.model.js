import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,
    },

    password:{
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    name :{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;