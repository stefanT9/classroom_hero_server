import { Schema, model, Types, Document } from "mongoose";
import { hashSync } from "bcrypt";
import { SALT_ROUNDS } from "../constants";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  created_on: Date;
  updated_on: Date;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  created_on: Date,
  updated_on: Date,
});

userSchema.virtual("userId").get(function () {
  return this._id;
});
userSchema.pre("save", function <IUser>(next) {
  this.password = hashSync(this.password, SALT_ROUNDS);
  this.created_on = this.created_on || new Date().toISOString();
  this.updated_on = new Date().toISOString();
  next();
});

export default model<IUser>("user", userSchema, "users");
