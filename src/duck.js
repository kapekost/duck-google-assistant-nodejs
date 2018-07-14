
const Nexmo = require('nexmo');
const config = require('config');
const ConversationClient = require('nexmo-stitch');

class Duck {
    constructor(app) {
        const APP_ID = config.get('Nexmo.APP_ID')
        const API_KEY = config.get('Nexmo.API_KEY');
        const API_SECRET = config.get('Nexmo.API_SECRET');
        const PRIVATE_KEY_PATH = config.get('Nexmo.PRIVATE_KEY_PATH');

        const nexmo = new Nexmo({
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            applicationId: APP_ID,
            privateKey: PRIVATE_KEY_PATH,
        });

        const conversationClient = new ConversationClient();
        const jwt = nexmo.generateJwt({
            application_id: APP_ID,
            sub: "kostas",
            exp: (new Date().getTime() + 60 * 60 * 1000) / 1000,
            acl: { "paths": { "/v1/users/**": {}, "/v1/conversations/**": {}, "/v1/sessions/**": {}, "/v1/devices/**": {}, "/v1/image/**": {}, "/v3/media/**": {}, "/v1/applications/**": {}, "/v1/push/**": {}, "/v1/knocking/**": {} } }
        });
        console.log(jwt);




        app.intent('Default Welcome Intent', conv => {
            nexmo.users.create(
                {
                    name: "kostas",
                    display_name: "Kostas Kapetanakis",
                    diplay_url: "https://randomuser.me/api/portraits/men/81.jpg"
                },
                () => {
                    conv.ask(`good morning Kostas!, new user is ready`);
                });
        });

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
        });
        app.intent('stitch welcome', conv => {
            return this.conversation.sendText('hi').then(() => {
                conv.ask('done');
            });
        });
    }
}

module.exports = Duck