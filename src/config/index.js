const dotenv = require('dotenv');

dotenv.config();

const config = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  MICROSERVICE_NAME: process.env.MICROSERVICE_NAME || 'NODE_BOILERPLATE',
  MICROSERVICE_IP: process.env.MICROSERVICE_IP || '0.0.0.0',
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_PORT: process.env.APP_PORT || '8080',
  SWAGGER_PORT: process.env.SWAGGER_PORT || '8080',
  MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || 'ims',
  AUTH_KEY: process.env.AUTH_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  MSG91_AUTH_KEY: process.env.MSG91_AUTH_KEY,
  MSG91_OTP_TEMPLATE_ID: process.env.MSG91_OTP_TEMPLATE_ID,
};

module.exports = config;
