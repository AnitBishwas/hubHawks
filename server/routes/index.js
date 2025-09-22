import { Router } from "express";
import authRoutes from "./auth.js";

const appRoutes = Router();

appRoutes.use("/auth",authRoutes); // public routes

export default appRoutes;