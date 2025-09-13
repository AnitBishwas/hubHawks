import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    freelancer: {
      type: Boolean,
      required: true,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
