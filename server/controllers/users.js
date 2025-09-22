import bcrypt from "bcrypt";
import UserModel from "../utils/models/User.js";
import { generateJwtToken } from "./auth.js";

/**
 * register user
 * @typedef {object} payload - payload inputs to register customer
 * @property {!string} firstName - customer first name
 * @property {string} lastName - customer lastName
 * @property {!string} email - customer email
 * @property {string} phone - customer phone number
 * @property {!string} password - customer password
 * @return {object} customer - registered customer
 */

const resgiterUser = async (payload) => {
  try {
    const hashedPass = await bcrypt.hash(payload.password, 10);
    const user = await UserModel.create({ ...payload, password: hashedPass });
    const jwtToken = await generateJwtToken(user._id);
    return {
      ...user,
      token: jwtToken,
    };
  } catch (err) {
    console.log(
      "❌ Failed to handle user registeration reason -->" + err.message
    );
    throw new Error(err.message);
  }
};

const loginUser = async (payload) => {
  try {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      throw new Error(`No user found with ${payload.email}`);
    }
    const passVerify = await bcrypt.compare(payload.password, user.password);
    if (!passVerify) {
      throw new Error(`No User found with ${payload.email}`);
    }
    const jwtToken = await generateJwtToken(user._id);
    return {
      user,
      token: jwtToken,
    };
  } catch (err) {
    console.log("❌ Failed to handle user login --->" + err.message);
    throw new Error(err.message);
  }
};
export { resgiterUser, loginUser };
