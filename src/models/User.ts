import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

// Explicitly define model and prevent re-compilation
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
