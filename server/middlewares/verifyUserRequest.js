import jwt from "jsonwebtoken";
import UserModel from "../utils/models/User.js";

const verifyJwtToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      if (!token) {
        return res.redirect("/account");
      }
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select("-password").lean();
    next();
  } catch (err) {
    res.redirect("/account");
    console.log("Failed to verify jwt token reason -->" + err.message);
  }
};

export { verifyJwtToken };
