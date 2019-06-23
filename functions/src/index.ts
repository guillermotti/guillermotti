const functions = require('firebase-functions');
// const http = require('http');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contact = require('./contact');

const email = express();
email.use(bodyParser.json());
email.use(cors());

email.post('/contact', (req: any, res: any) => {
  contact(req.body);
  res.status(200).send();
});

exports.email = functions.https.onRequest(email);
