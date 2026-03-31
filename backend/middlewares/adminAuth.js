import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    //  Extract actual token
    const token = authHeader.split(" ")[1];

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //  Check if the email matches the admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
