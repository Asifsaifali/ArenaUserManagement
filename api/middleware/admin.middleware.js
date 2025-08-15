import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: Token missing" });
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({ message: "Server configuration error" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role && decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    req.user = decoded;

    next(); 
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyAdmin;
