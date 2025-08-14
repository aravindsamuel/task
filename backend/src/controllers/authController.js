import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import { sendEmail } from "../utils/mailer.js";

const SALT_ROUNDS = 10;

function generateJWT(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const confirmToken = crypto.randomBytes(32).toString("hex");
    const confirmTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const user = await User.create({
      id: uuidv4(),
      name,
      email,
      passwordHash,
      confirmToken,
      confirmTokenExpires,
      isVerified: false
    });

    const confirmUrl = `${process.env.API_URL || process.env.APP_URL}/auth/confirm/${confirmToken}`;
    const html = `
      <p>Hi ${name || "there"},</p>
      <p>Thanks for signing up. Please confirm your email by clicking below:</p>
      <a href="${confirmUrl}">Confirm Email</a>
      <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail({ to: email, subject: "Confirm your account", html });

    return res.status(201).json({ message: "User created. Please check your email to confirm." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function confirmEmail(req, res) {
  try {
    const { token } = req.params;
    const user = await User.findOne({ where: { confirmToken: token } });
    if (!user) return res.status(400).json({ message: "Invalid token" });
    if (user.confirmTokenExpires < new Date()) return res.status(400).json({ message: "Token expired" });

    user.isVerified = true;
    user.confirmToken = null;
    user.confirmTokenExpires = null;
    await user.save();

    const jwtToken = generateJWT(user);
    return res.json({ message: "Email verified", token: jwtToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Incorrect Password" });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first in your mail account" });

    const token = generateJWT(user);
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `${process.env.APP_URL}/reset-password/${resetToken}`; // frontend route
    const html = `
      <p>Hi ${user.name || ""},</p>
      <p>Click the link below to reset your password. It expires in 1 hour.</p>
      <a href="${resetUrl}">Reset password</a>
    `;

    await sendEmail({ to: user.email, subject: "Password reset", html });

    return res.json({ message: "we sent password reset link to email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) return res.status(400).json({ message: "Invalid token" });
    if (user.resetTokenExpires < new Date()) return res.status(400).json({ message: "Token expired" });

    user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Your password was changed",
      html: `<p>Your password has been updated successfully.</p>`
    });

    return res.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
