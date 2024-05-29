const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    const user = new User({ name, userName, password });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    const existingUser = await user.findOne({ userName });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const savedUser = await user
      .save()
      .project({ name: 1, userName: 1, _id: 1, password: 0 });
    const token = jwt.sign({ id: savedUser._id }, process.env.secreteKey, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "User created successfully", token, user: savedUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const Login = async (req, res) => {
  try {
    const { userName, passowrd } = req.body();
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(passowrd, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.secreteKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const ForgetPassword = async (req, res) => {
  try {
    const { userName } = req.body();
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 7;
    await user.save();
  } catch (err) {
    res
      .status(500)
      .json({ err: "An error occured while generating the reset token" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body();
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired reset token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ err: "An error occured while changing the password" });
  }
};

module.exports = { signup, Login, ForgetPassword, ResetPassword };
