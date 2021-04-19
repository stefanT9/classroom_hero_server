import {
  EmailInUse,
  InvalidEmailPasswordCombo,
  UserNotFound,
} from "../exceptions/authExceptions";

import { RequestHandler } from "express-serve-static-core";
import {
  attemptLogin,
  attemptRegister,
  getUserFromHeader,
} from "../services/auth/authService";
import getLogger from "../utlis/logger";
import { getTokenUser } from "@/services/auth/authUtils";

const logger = getLogger("auth");

export const verifyToken: RequestHandler = async (req, res) => {
  try {
    const user = await getUserFromHeader(req.headers);
    return res.status(200).json({ user, message: "correct token" });
  } catch (err) {
    return res
      .status(401)
      .json({ user: null, message: err.message, error: err.message });
  }
};
export const login: RequestHandler = async (req, res) => {
  try {
    const { token, user } = await attemptLogin(
      req.body.email,
      req.body.password
    );
    console.log({ token, user });
    return res.status(200).json({ token, user });
  } catch (err) {
    if (err instanceof InvalidEmailPasswordCombo) {
      logger.debug("Invalid email password combo", { err, body: req.body });
      return res.status(404).json({ token: null, message: err.message });
    }
    if (err instanceof UserNotFound) {
      logger.debug("User not found", { err, body: req.body });
      return res.status(404).json({ token: null, message: err.message });
    }
    logger.error("INTERNAL SERVER ERROR", { err });
    return res
      .status(500)
      .json({ token: null, message: "internal server error" });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await attemptRegister(email, password);
    res.status(200).json({ user });
  } catch (err) {
    if (err instanceof EmailInUse) {
      logger.info("could not register, email already in use", err.message);
      return res.status(401).json({ message: err.message });
    }
    logger.error("ERROR on register", { err });
    return res.status(500).json({
      message: "internal server error",
      err,
    });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (err) {
    logger.error("ERROR on reset password", {
      message: "internal server error",
      err,
    });
  }
};
