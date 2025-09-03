// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensures each email is unique
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // by default, a new user is not an admin
    },
  },
  {
    timestamps: true, // adds `createdAt` and `updatedAt` timestamps
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;