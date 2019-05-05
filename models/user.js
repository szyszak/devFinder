const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    maxlength: 20,
    trim: true,
    required: true,
  },
  skillLevel: {
    type: String,
    min: 1,
    max: 5,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 20,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 8,
      maxlength: 50,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    location: {
      country: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
        required: true,
      },
      city: {
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true,
        required: true,
      },
    },
    phone: {
      type: String,
      minlength: 7,
      maxlength: 15,
      trim: true,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default: 'default.jpg',
    },
    skills: [skillSchema],
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
