const express = require('express')
const bodyParser = require("body-parser");
const Duck = require('./duck');

const { dialogflow } = require('actions-on-google');
const app = dialogflow();

//start the server and bind our core logic with the dialogflow
new Duck(app);
express().use(bodyParser.json(), app).listen(8000, () => console.log('Duck service! port:8000'))
