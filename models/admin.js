const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  login: {
    type: String,
    minlength: 6,
    maxlength: 20,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 64,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
