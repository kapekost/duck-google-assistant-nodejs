const express = require('express')
const bodyParser = require("body-parser");
const Duck = require('./duck');

const {
    dialogflow,
    Image,
} = require('actions-on-google');
const app = dialogflow();

app.post('/stitch_event', (req, res) => {
    duck.process(req, res);
    // res.send(JSON.stringify({
    //     "speech": res,
    //     "displayText": res
    // }))
});

new Duck(app);

express().use(bodyParser.json(), app).listen(8000, () => console.log('Duck service!'))