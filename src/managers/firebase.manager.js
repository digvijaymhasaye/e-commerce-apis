const firebaseAdmin = require('firebase-admin');
const path = require('path');
const config = require('../config');
const serviceAccount = require('../config/firebase-admin.json');

console.info(`Config - ${JSON.stringify(config)}`);
const grocerApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const messaging = grocerApp.messaging();

module.exports = {
  messaging,
};
