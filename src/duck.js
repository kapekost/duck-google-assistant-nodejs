const DialogflowApp = require('actions-on-google').DialogflowApp;

class Duck {
    constructor(request, response) {
        const app = new DialogflowApp({
            request: request,
            response: response
        });
        const MORNING_INTENT = 'input.morning';


        function morningIntent(app) {
            app.tell(`good morning to you too!`);
        }


        const actionMap = new Map();
        actionMap.set(MORNING_INTENT, morningIntent);
        app.handleRequest(actionMap);

    }
}

module.exports = Duck