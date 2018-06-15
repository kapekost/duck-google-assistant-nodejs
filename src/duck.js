const DialogflowApp = require('actions-on-google').DialogflowApp;
const Nexmo = require('nexmo');
const ConversationClient = require('nexmo-stitch');

class Duck {
    constructor(request, response) {
        const APP_ID = "YOUR APP ID";
        const API_KEY = "YOUT API KEY";
        const API_SECRET = "YOUR API SECRET";
        const PRIVATE_KEY_PATH = "private.key";

        const nexmo = new Nexmo({
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            applicationId: APP_ID,
            privateKey: PRIVATE_KEY_PATH,
        });

        const conversationClient = new ConversationClient();
        const jwt = nexmo.generateJwt({
            application_id: APP_ID, sub: "kostas",
            exp: (new Date().getTime() + 60 * 60 * 1000) / 1000,
            acl: { "paths": { "/v1/users/**": {}, "/v1/conversations/**": {}, "/v1/sessions/**": {}, "/v1/devices/**": {}, "/v1/image/**": {}, "/v3/media/**": {}, "/v1/applications/**": {}, "/v1/push/**": {} } }
        });
        console.log(jwt);
        const app = new DialogflowApp({
            request: request,
            response: response
        });
        const MORNING_INTENT = 'input.morning';
        const LOGIN_INTENT = 'input.login'

        const current_conversation = null;

        function morningIntent(app) {
            nexmo.users.create(
                {
                    name: "kostas",
                    display_name: "Kostas Kapetanakis",
                    diplay_url: "https://randomuser.me/api/portraits/men/81.jpg"
                },
                () => {
                    app.tell(`good morning to you too!, new user is ready`);
                });
        }

        function loginIntent(app) {
            conversationClient.login(jwt).then((stitchApp) => {
                console.log('logged in' + jwt);
                return stitchApp.newConversationAndJoin({ display_name: "miss Duck" })
                    .then((conversation) => {
                        current_conversation = conversation;
                        app.tell(`welcome to the stitch conversation!`);
                    });
            }).catch(error => console.log(error));
        }


        const actionMap = new Map();
        actionMap.set(MORNING_INTENT, morningIntent);
        actionMap.set(LOGIN_INTENT, loginIntent);
        app.handleRequest(actionMap);

    }
}

module.exports = Duck