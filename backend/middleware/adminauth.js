import jwt from "jsonwebtoken";

const adminauth = (req, res, next) => {
  //   console.log("🔹 Admin Auth Middleware Called");

  const authHeader = req.headers.authorization;
  //   console.log("🔹 Received Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  //   console.log("🔹 Extracted Token:", token);

  if (!token || typeof token !== "string") {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("🔹 Decoded Token:", decoded);

    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminauth;
