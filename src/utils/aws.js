/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v4: uuidV4 } = require('uuid');
const config = require('../config');

const S3 = new AWS.S3();

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_KEY_ID,
});

const upload = async ({ file_path, owner_id }) => {
  console.log('File path = ', file_path);
  const fileBody = await fs.readFileSync(file_path);
  const uploadedFile = await S3.upload({
    Key: `${owner_id}-${uuidV4()}${path.extname(file_path)}`,
    Body: fileBody,
    ACL: 'public-read',
    Bucket: config.AWS_BUCKET_NAME,
  }).promise();

  console.info(`Uploaded file = ${uploadedFile}`);

  return uploadedFile;
};

module.exports = {
  upload,
};
