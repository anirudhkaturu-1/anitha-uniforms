import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

    // console.log("Auth header:", authHeader); // <-- debug

  // Check if token exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, token missing",
    });
  }

  //  Extract the token only
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //  Attach userId to request safely (not body)
    req.userId = decoded.id; // or decoded._id based on your token

    next(); 
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;
