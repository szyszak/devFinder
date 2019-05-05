const express = require('express');

const { getUsers } = require('../controllers/publicController');

const publicRouter = express.Router();

// get all users
publicRouter.get('/users', getUsers);

module.exports = publicRouter;
