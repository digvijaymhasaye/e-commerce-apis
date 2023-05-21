const multer = require('multer');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const getImage = () => multer({
  storage,
  // eslint-disable-next-line consistent-return
  fileFilter: (req, file, cb) => {
    console.info('multer');
    const ext = path.extname(file.originalname);
    console.info('Extension = ', ext);
    // if (ext !== '.csv') {
    //   const err = new Error('Only csv are allowed');
    //   err.name = 'ValidationError';
    //   err.details = [{ context: { key: 'file' }, type: '.csv', message: 'File must be csv' }];
    //   return cb(err);
    // }
    // if (file.mimetype !== 'text/csv') {
    //   const err = new Error('Only text/csv mimetype are allowed');
    //   err.name = 'ValidationError';
    //   err.details = [{ context: { key: 'file' }, mimetype: 'text/csv', message: 'File must be text/csv mimetype' }];
    //   return cb(err);
    // }
    cb(null, true);
  },
  limits: { fileSize: config.FILE_SIZE_LIMIT },
}).single('image');

const getImages = () => multer({
  storage,
  // eslint-disable-next-line consistent-return
  fileFilter: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    // if (ext !== '.csv') {
    //   const err = new Error('Only csv are allowed');
    //   err.name = 'ValidationError';
    //   err.details = [{ context: { key: 'file' }, type: '.csv', message: 'File must be csv' }];
    //   return cb(err);
    // }
    // if (file.mimetype !== 'text/csv') {
    //   const err = new Error('Only text/csv mimetype are allowed');
    //   err.name = 'ValidationError';
    //   err.details = [{ context: { key: 'file' }, mimetype: 'text/csv', message: 'File must be text/csv mimetype' }];
    //   return cb(err);
    // }
    cb(null, true);
  },
  limits: { fileSize: config.FILE_SIZE_LIMIT },
}).array('images');

module.exports = {
  getImage,
  getImages,
};
