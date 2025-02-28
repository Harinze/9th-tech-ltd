import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
