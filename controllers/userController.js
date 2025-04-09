import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function userSignup(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields !",
      });
    }

    const findExistingUser = await User.findOne({ email });
    if (findExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist, please login !",
      });
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPwd,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Sign up successful !", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error !",
    });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No user found, please signup !" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Incorrect password !" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "5h" }
    );
    res.cookie("jwt", token, {
      strict: true,
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful !", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error !",
    });
  }
}

export async function logoutUser(req, res) {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error !",
    });
  }
}
