import mongoose, { Schema, Document, Model } from "mongoose";
import { ICreateUserInput } from "../schemas/createUser.schema";

export interface IUser extends ICreateUserInput, Document {}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "User full name is required"],
      trim: true,
      minLength: 3,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: Partial<IUser>) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
