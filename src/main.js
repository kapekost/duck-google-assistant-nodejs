// const NexmoConversation = require('./node_modules/nexmo-conversation/lib/sdk');
// const nexmoConversation = new NexmoConversation();

const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const Duck = require('./duck');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const duck = new Duck(req, res);
});

app.listen(8000, () => console.log('Duck service!'))