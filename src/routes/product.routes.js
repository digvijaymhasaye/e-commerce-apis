const express = require('express');
const multer = require('multer');
const config = require('../config');
const { productController } = require('../controllers');

const productRoutes = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({
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
}).single('image');

productRoutes.get('/count', productController.getListCount);
productRoutes.get('/', productController.getList);
productRoutes.post('/', upload, productController.addOne);
productRoutes.get('/:productId', productController.getOne);
productRoutes.put('/:productId', upload, productController.updateOne);
productRoutes.delete('/:productId', productController.deleteOne);

module.exports = productRoutes;
