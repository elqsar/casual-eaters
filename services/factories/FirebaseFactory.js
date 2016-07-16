'use strict';

const firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: './config/Casual Eaters-40fecfd97967.json',
  databaseURL: 'https://casual-eaters.firebaseio.com'
});

module.exports = firebase.database();
