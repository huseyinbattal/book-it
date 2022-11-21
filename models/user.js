import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    maxLength: [50, "Your email cannot exceed 50 characters"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving user

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next()
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
})

export default mongoose.models.User || mongoose.model("User", userSchema);
