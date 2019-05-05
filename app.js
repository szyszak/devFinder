require('dotenv').config({ path: './.env' });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const DB = require('./DB');

const publicRouter = require('./routes/publicRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();
const PORT = process.env.PORT || 3002;

// connect to database
DB.connect(process.env.MONGODB_URI);

// CORS
app.use(cors());

// body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public router setup
app.use('/', publicRouter);

// admin router setup
app.use('/admin', adminRouter);

// serve static files
app.use(express.static(path.join(__dirname, 'files'))); // user pictures

// environment
if (process.env.NODE_ENV === 'production') {
  console.log('APP RUNNING IN PRODUCTION MODE');
  app.use(express.static(path.join(__dirname, 'client/build'))); // react build

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else if (process.env.NODE_ENV === 'development') {
  console.log('APP RUNNING IN DEVELOPMENT MODE');

  // logger
  app.use(morgan('dev'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/index.html'));
  });
} else {
  console.error('NODE_ENV NOT SPECIFIED, SHUTTING DOWN');
  process.exit(9);
}

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
