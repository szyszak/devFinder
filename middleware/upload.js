const multer = require('multer');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files');
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.')[1].toLowerCase();

    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      cb(null, `${uniqid.process()}.${ext}`);
    } else {
      console.error('WRONG FILE EXTENSION!!!');
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
