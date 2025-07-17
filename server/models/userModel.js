import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  years: Number,
  description: String,
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  fieldOfStudy: String,
  years: Number,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['seeker', 'employer'],
      required: [true, 'Please specify a role: seeker or employer'],
    },
    profile: {
      headline: { type: String, default: '' },
      bio: { type: String, default: '' },
      location: { type: String, default: '' },
      resume: { type: String, default: '' }, 
      companyName: { type: String, default: '' },
      // New fields for detailed seeker profiles
      skills: [String],
      experience: [experienceSchema],
      education: [educationSchema],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Mongoose method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;