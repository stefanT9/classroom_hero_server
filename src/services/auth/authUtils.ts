import { IUser } from "@/model/user";
import { hashSync, compareSync } from "bcrypt";
import { SALT_ROUNDS, SECRET } from "../../constants";
import * as jwt from "jsonwebtoken";
import { getUserByEmail } from "../userService.ts/userService";

export const isValidToken = (token: string) => {
  try {
    console.log(token);
    jwt.verify(token, SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export const getUserToken = (user: IUser) => {
  console.log(user);
  return jwt.sign(user.toJSON(), SECRET);
};

export const getTokenUser = async (token: string) => {
  if (!isValidToken(token)) {
    throw new Error("Invalid token");
  }
  const result = jwt.verify(token, SECRET);
  if (typeof result === "string") {
    throw new Error("Decoding of token should result in an IUser");
  }
  const userResult: any = result;
  if (!userResult.email) {
    throw new Error("Invalid token payload, it should contain email");
  }
  console.log(userResult);
  return await getUserByEmail(userResult.email);
};

export const encryptPassword = (password: string) => {
  return hashSync(password, SALT_ROUNDS);
};
