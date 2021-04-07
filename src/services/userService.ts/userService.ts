import { UserNotFound } from "../../exceptions/authExceptions";
import user from "../../model/user";

export const getUserByEmail = async (email: string) => {
  const found = await user.findOne({ email });
  if (!found) {
    throw new Error(`Did not find user with with email ${email}`);
  }
  return found;
};
