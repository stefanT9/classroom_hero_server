import { Router } from "express";
import {
  register,
  login,
  resetPassword,
  verifyToken,
} from "../controllers/authController";
import {
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../schemas/auth";

const authRouter = Router();
authRouter.post("/login", validateLogin, login);
authRouter.post("/verify-token", verifyToken);
authRouter.post("/register", validateRegister, register);
authRouter.post("/forgot-password", validateResetPassword, resetPassword);
export default authRouter;
