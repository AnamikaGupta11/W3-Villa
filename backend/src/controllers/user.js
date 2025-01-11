import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Sign-in
export const createAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username should have at least 4 characters" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    return res.status(200).json({ message: "Sign-up successful" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Log-in
export const loginAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).json({ id: existingUser._id, token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const { username, email, password } = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email or username already exists." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(200).json({
      message: "Email verified successfully! Your account has been created.",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};
