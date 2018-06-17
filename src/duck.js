
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
                    app.ask(`good morning to you too!, new user is ready`);
                });
        }

        app.intent('login', conv => {
            // conv.ask(`Sure, let's login!`);
            return conversationClient.login(jwt).then((stitchApp) => {
                console.log('logged in');
                conv.ask(`logged in as Kostas!`);
                return stitchApp.newConversationAndJoin({ display_name: "Stitch Duck" })
                    .then((conversation) => {
                        console.log('created conversation' + conversation.display_name);
                        conv.ask(`Welcome to the conversation ${conversation.display_name}`);
                        this.conversation = conversation;
                    });
            }).catch(error => console.log(error));
        })
    }
}

module.exports = Duck