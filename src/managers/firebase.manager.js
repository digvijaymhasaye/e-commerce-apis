const firebaseAdmin = require('firebase-admin');
const path = require('path');
const config = require('../config');

const grocerApp = firebaseAdmin.initializeApp({
  type: config.FIREBASE_ACCOUNT_TYPE,
  project_id: config.FIREBASE_PROJECT_ID,
  private_key_id: config.FIREBASE_PRIVATE_KEY_ID,
  private_key: config.FIREBASE_PRIVATE_KEY,
  client_email: config.FIREBASE_CLIENT_EMAIL,
  client_id: config.FIREBASE_CLIENT_ID,
  auth_uri: config.FIREBASE_AUTH_URI,
  token_uri: config.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: config.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: config.FIREBASE_CLIENT_X509_CERT_URL,
});

const messaging = grocerApp.messaging();

module.exports = {
  messaging,
};
