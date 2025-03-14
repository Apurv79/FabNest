import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    // ✅ Extract token correctly
    const token = authHeader.split(" ")[1];
    // console.log(token);

    // ✅ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("text decoded", decoded);
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    req.user = { id: decoded.id };
    // console.log(req.user); // ✅ Store user ID in req.user

    next(); // ✅ Proceed only if verification succeeds
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
