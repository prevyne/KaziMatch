import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectOptional = async (req, res, next) => {
  console.log('--- [1] Executing protectOptional middleware ---');
  let token = req.cookies.jwt;
  console.log('Cookie found:', token ? 'Yes' : 'No');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User successfully decoded from token:', !!req.user);
    } catch (error) {
      console.log('Token verification failed:', error.message);
      req.user = null;
    }
  }
  next();
};

export const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        res.status(401);
        return next(new Error('Not authorized, user not found'));
      }
      next();
    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

export const isSeeker = (req, res, next) => {
  if (req.user && req.user.role === 'seeker') {
    next();
  } else {
    res.status(403);
    return next(new Error('Not authorized as a seeker'));
  }
};

export const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next();
  } else {
    res.status(403);
    return next(new Error('Not authorized as an employer'));
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    return next(new Error('Not authorized as an admin'));
  }
};