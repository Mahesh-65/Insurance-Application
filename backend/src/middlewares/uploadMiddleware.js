const multer = require('multer');
const ApiError = require('../utils/ApiError');

const allowedMimeTypes = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new ApiError(400, 'Invalid file format'));
    }
    return cb(null, true);
  }
});

module.exports = upload;
