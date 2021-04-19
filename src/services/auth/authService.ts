import models from "../../model";
import {
  EmailInUse,
  InvalidEmailPasswordCombo,
  InvalidToken,
  TokenNotAvailable,
  UserNotFound,
} from "../../exceptions/authExceptions";
import { getTokenUser, getUserToken } from "./authUtils";
import { compareSync } from "bcrypt";
import { IncomingHttpHeaders } from "http";
import { IUser } from "@/model/user";
const { user } = models;
import * as cookieParser from "cookie-parser";

export const attemptLogin = async (email: string, password: string) => {
  const foundUser = await user.findOne({ email });
  if (!foundUser) {
    throw new UserNotFound();
  }

  if (!compareSync(password, foundUser.password)) {
    throw new InvalidEmailPasswordCombo();
  }

  return { token: getUserToken(foundUser), user: foundUser };
};
export const attemptRegister = async (email: string, password: string) => {
  const oldUser = await user.findOne({
    email: email,
  });
  if (oldUser) {
    throw new EmailInUse();
  }
  const created = await user.create({
    email,
    password,
  });

  if (created) {
    delete created.password;
    return created;
  }
  //todo: confirm email

  throw new Error("Something went wrong");
};

export const getUserFromHeader = async (headers: IncomingHttpHeaders) => {
  // todo if cookie will have more than acces token this will break
  // const token = headers?.authorization?.substr(7);

  const token = headers?.authorization
    ? headers?.authorization?.substr(7)
    : headers.cookie.split("=")[1].split(";")[0];
  if (!token) {
    throw new TokenNotAvailable();
  }
  console.log(token);
  const user: IUser = await getTokenUser(token);
  return user;
};
