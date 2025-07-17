import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes by verifying JWT
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
      console.error(error);
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

// Middleware to check for 'seeker' role
export const isSeeker = (req, res, next) => {
  if (req.user && req.user.role === 'seeker') {
    next();
  } else {
    res.status(403); // 403 Forbidden
    return next(new Error('Not authorized as a seeker'));
  }
};

// Middleware to check for 'employer' role
export const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next();
  } else {
    res.status(403); // 403 Forbidden
    return next(new Error('Not authorized as an employer'));
  }
};

// Middleware to check for 'admin' role
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // 403 Forbidden
    return next(new Error('Not authorized as an admin'));
  }
};