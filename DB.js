const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true); // removes deprecation warning

class Database {
  connect(uri) {
    mongoose
      .connect(uri, { useNewUrlParser: true }) // removes deprecation warning
      .then(() => {
        console.log('Database connection succesful');
      })
      .catch((err) => {
        console.error(`Database connection error: ${err}`);
      });
  }
}

module.exports = new Database();
