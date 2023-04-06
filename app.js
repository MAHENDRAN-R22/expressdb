"use strict";
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const formRecord = require('./public/validation.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
//to connect mongodb server
mongoose.connect('mongodb://localhost:27017/Regform', {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
     console.log("db was sucessfully connected")
}).catch((err) => {
     res.status(500).send("error occured")
})
//to send ui page doc to browser side
app.get('/', (req, res) => {
     //console.log(req);
     res.sendFile(__dirname + '/public/stuhomepage.html');
});
//get response and save data to db
app.post('/stuDatabase', (req, res) => {
     const contact = new formRecord();
     contact.fName = req.body.fName;
     contact.mName = req.body.mName;
     contact.lName = req.body.lName;
     contact.mailId = req.body.mailId;
     contact.num = req.body.num;
     contact.dob = req.body.dob;
     contact.genderVal = req.body.genderVal;
     contact.university = req.body.university;
     contact.save((err, sucess) => {
          if (err) {
               res.status(500).send("error occured")
          } else {
               res.status(200).send("text received..");
          }
     });
});
//to send database record to ui side
app.post('/view', (req, res) => {
     formRecord.find({}, function (err, sucess) {
          if (err) {
               res.status(500).send("error occured")
          } else {
               res.status(200).send(sucess);
          }
     });
})
app.listen(9033, () => {
     console.log("server is listening 9032 port");
});
