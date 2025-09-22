import { Router } from "express";
import { RegisterUser, User } from "../helpers/validators/user.js";
import UserModel from "../utils/models/User.js";
import { loginUser, resgiterUser } from "../controllers/users.js";

const authRoutes = Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const validatePayload = RegisterUser.safeParse(req.body);
    if (!validatePayload.success) {
      throw new Error("Required parameters missing");
    }
    const checkEmailDubplication = await UserModel.findOne({
      email: req.body.email,
    });
    if (checkEmailDubplication) {
      throw new Error("Customer already registered with the email address");
    }
    const { user, token } = await resgiterUser(req.body);
    res.cookie("token", token, { httpOnly: true });
    res.json({ user, token });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: err.message,
    });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const validatePayload = User.safeParse(req.body);
    if (!validatePayload.success) {
      throw new Error("Invalid credentials");
    }
    const { user, token } = await loginUser(req.body);
    res.cookie("token", token, { httpOnly: true });
    res.json({ user, token });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
});

authRoutes.post("/logout",async(req,res) =>{
  try{
    res.clearCookie("token");
    res.json({ok: true})
  }catch(err){
    res.status(400).json({
      ok:false,
      message: err.message
    })
  }
});

authRoutes.get("/google/callback", () => {});

authRoutes.get("/google", () => {});

export default authRoutes;
