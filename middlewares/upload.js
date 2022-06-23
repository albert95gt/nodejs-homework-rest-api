const multer = require('multer');
const { BadRequest } = require('http-errors');
const { TEMP_DIR } = require('../helpers/constants');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(BadRequest('Wrong format'));
    }
  },
});

module.exports = upload;
