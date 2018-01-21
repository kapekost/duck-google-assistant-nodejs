const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

class Duck {
    constructor(request, response) {
        const app = new ActionsSdkApp({
            request: request,
            response: response
        });

        console.log('ready');
        const noInputs = [
            `I didn't hear a number`,
            `If you're still there, what's the number?`,
            'What is the number?'
        ];

        function mainIntent(app) {
            const ssml = '<speak>Hi! <break time="1"/> ' +
                'I can read out an ordinal like ' +
                '<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>';
            const inputPrompt = app.buildInputPrompt(true, ssml, noInputs);
            app.ask(inputPrompt);
        }

        function rawInput(app) {
            if (app.getRawInput() === 'bye') {
                app.tell('Goodbye!');
            } else {
                const ssml = '<speak>You said, <say-as interpret-as="ordinal">' +
                    app.getRawInput() + '</say-as></speak>';
                const inputPrompt = app.buildInputPrompt(true, ssml, noInputs);
                app.ask(inputPrompt);
            }
        }

        const actionMap = new Map();
        actionMap.set(app.StandardIntents.MAIN, mainIntent);
        actionMap.set(app.StandardIntents.TEXT, rawInput);

        app.handleRequest(actionMap);

    }

}

module.exports = Duck