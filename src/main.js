const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const Duck = require('./duck');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const duck = new Duck(req, res);
    // res.send(JSON.stringify({
    //     "speech": res,
    //     "displayText": res
    // }))
});

app.listen(8000, () => console.log('Duck service!'))