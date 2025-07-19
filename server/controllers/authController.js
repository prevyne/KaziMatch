import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    // This is the crucial logic that sets the correct SameSite policy
    sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password, role });
    if (user) {
      generateTokenAndSetCookie(res, user._id);
      res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }
    const user = await User.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
      generateTokenAndSetCookie(res, user._id);
      res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};