import jwt from "jsonwebtoken";
/**
 * generate JWT Token for user
 * @param {string} id - customer id
 * @returns {string} jwt string
 */

const generateJwtToken = async (id) => {
  try {
    return await jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (err) {
    throw new Error(
      "Failed to generate generate JWT token reason -->" + err.message
    );
  }
};

export { generateJwtToken };
