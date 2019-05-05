const User = require('../models/user');

const publicController = {
  // get all users
  getUsers: async (req, res) => {
    await User.find({ active: true })
      .select('-active -createdAt -updatedAt -__v')
      .then((document) => {
        // console.log(document);
        res.json(document);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },
};

module.exports = publicController;
