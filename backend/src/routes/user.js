import express from "express";
import {
  createAccount,
  loginAccount,
  verifyEmail,
} from "../controllers/user.js";

const router = express.Router();

// SIGN-IN APIs
router.post("/sign-in", createAccount);

// LOGIN
router.post("/log-in", loginAccount);

// VERIFY EMAIL
router.get("/verify-email", verifyEmail);

export default router;
