const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Admin = require('../models/admin');

const adminController = {
  // get all users
  getUsers: async (req, res) => {
    await User.find()
      .then((document) => {
        // console.log(document);
        res.json(document);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  // get user by id
  getUserById: async (req, res) => {
    const id = req.params.id;
    console.log(`Getting user with id: ${id}`);

    await User.findById(id, (err, document) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.json(document);
      }
    });
  },

  // add user
  addUser: async (req, res) => {
    // console.log(`File: ${JSON.stringify(req.file)}`);
    // console.log(`Request body: ${JSON.stringify(req.body)}`);
    if (req.file) req.body.pic = req.file.filename;
    // solves parsing of nested objects issiues
    req.body.skills = JSON.parse(req.body.skills);
    req.body.location = JSON.parse(req.body.location);

    const user = new User(req.body);

    await user
      .save()
      .then((document) => {
        console.log(`Saving user to database: ${document}`);
        res.json(document);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  // update user by id
  updateUserById: async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(`Updating user with id: ${req.params.id}`);

    // TODO: solve depracation warning, although docs say it should be OK
    await User.findOneAndUpdate({ _id: id }, updatedData, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  },

  // remove user by id
  removeUserById: async (req, res) => {
    const id = req.params.id;
    console.log(`Removing user with id: ${id}`);

    await User.findById(id, (err, user) => {
      if (user.pic !== 'default.jpg') {
        fs.unlink(`files/${user.pic}`, (fileErr) => {
          if (fileErr) {
            console.error(fileErr);
          } else {
            console.log(`File "${user.pic}" deleted`);
          }
        });
      }
    });

    await User.findByIdAndDelete(id, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.json({ id });
      }
    });
  },

  // create admin account
  // signUp: (req, res) => {
  //   bcrypt.hash(req.body.password, 10, (err, hash) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ error: err });
  //     } else {
  //       const admin = new Admin({
  //         login: req.body.login,
  //         password: hash,
  //       });

  //       admin
  //         .save()
  //         .then((document) => {
  //           console.log(`Admin account for ${document.login} created`);

  //           res
  //             .status(201)
  //             .json({ message: `admin account for ${document.login} created` });
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           res.status(500).json({ error: err });
  //         });
  //     }
  //   });
  // },

  logIn: (req, res) => {
    // console.log(req.body);
    Admin.findOne({ login: req.body.login })
      .then((document) => {
        if (document === null) {
          res.status(401).json({
            // user not found
            message: 'Auth failed',
          });
        } else {
          bcrypt.compare(
            req.body.password,
            document.password,
            (err, result) => {
              if (err) {
                return res.status(401).json({
                  // bcrypt error
                  message: 'Auth failed',
                });
              }

              if (result) {
                const token = jwt.sign(
                  { login: document.login },
                  process.env.JWT_KEY,
                  {
                    expiresIn: '1h',
                  },
                );

                return res
                  .status(200)
                  .json({ message: 'Auth successful', token });
              }

              return res.status(401).json({
                // wrong password
                message: 'Auth failed',
              });
            },
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

module.exports = adminController;
