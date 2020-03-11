const functions = require('firebase-functions');
const request = require("request");
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

const recaptcha = express();
recaptcha.use(bodyParser.json());
recaptcha.use(cors());

recaptcha.post('/validate', (req: any, res: any) => {
  const token = req.body.recaptcha;
  const secretKey = "6LcWV-AUAAAAAE5bB58PDPuXqOrizmAFJRcVTHWO"; //the secret key from your google admin console;

  //token validation url is URL: https://www.google.com/recaptcha/api/siteverify 
  // METHOD used is: POST
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

  //note that remoteip is the users ip address and it is optional
  // in node req.connection.remoteAddress gives the users ip address

  if (token === null || token === undefined) {
    res.status(201).send({ success: false, message: "Token is empty or invalid" })
  }

  request(url, (err: any, response: any, body: any) => {
    body = JSON.parse(body);
    //check if the validation failed
    if (body.success !== undefined && !response.data.success) {
      res.send({ success: false, 'message': "recaptcha failed" });
    }

    //if passed response success message to client
    res.send({ "success": true, 'message': "recaptcha passed" });

  })
});

exports.email = functions.https.onRequest(email);
exports.recaptcha = functions.https.onRequest(recaptcha);
