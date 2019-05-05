const express = require('express');

const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  removeUserById,
  // signUp,
  logIn,
} = require('../controllers/adminController');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const adminRouter = express.Router();

// get all users
adminRouter.get('/users', auth, getUsers);

// get user by id
adminRouter.get('/users/:id', auth, getUserById);

// add user
adminRouter.post('/users', auth, upload.single('pic'), addUser);

// update user by id
adminRouter.put('/users/:id', auth, updateUserById);

// remove user by id
adminRouter.delete('/users/:id', auth, removeUserById);

// create admin account
// adminRouter.post('/signup', signUp);

// log in
adminRouter.post('/login', logIn);

module.exports = adminRouter;
