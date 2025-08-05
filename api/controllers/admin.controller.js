import AdminRepository from "../repository/admin.repository.js";
import { hashPassword } from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail.js";
import Admin from "../models/admin.model.js";
const adminRepository = new AdminRepository();

const createAdmin = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    // 1. Check Required Fields
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // 2. Validate Email Format
    if (!isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
        success: false,
      });
    }

    // 3. Check Duplicate Email
    const existingAdmin = await adminRepository.adminLogin(email);
    if (existingAdmin) {
      return res.status(409).json({
        message: "Email already in use",
        success: false,
      });
    }
    const hashPass = await hashPassword(password);
    const data = { name, username, password: hashPass, email };
    const admin = await adminRepository.crateAdmin(data);

    return res.status(201).json({
      message: "Admin created successfully",
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Error in Controller while creating admin:", error);
    return res.status(500).json({
      message: "Failed to create admin",
      success: false,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate Email Format
    if (!isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // 2. Check if Email Exists in Database
    const admin = await adminRepository.adminLogin(email);
    if (!admin) {
      return res.status(404).json({
        message: "Email not registered",
        success: false,
      });
    }

    // 3. Check Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    // 4. Issue JWT
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    admin.isVerified = true;
    await admin.save();

    return res.status(200).json({
      message: `Welcome back, ${admin.name}`,
      token,
      success: true,
      data: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Something went wrong, please try again later.",
      success: false,
    });
  }
};


const getAdminProfile = async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { createAdmin, adminLogin, getAdminProfile };
