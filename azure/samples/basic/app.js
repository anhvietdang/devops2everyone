var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8181, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    // appId: process.env.MICROSOFT_APP_ID,
    appId: '3468f1c0-c207-4c95-a6d1-30bff1e80743',
    appPassword: 'alcZDL098_;$morzEDON52?'
    // appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
// Listen for messages from users
server.post('api/messages', connector.listen());

//=========================================================
// Recognizers
//=========================================================

var qnarecognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: 'd9bb7a21-96b6-4dcc-8589-8a9ad1584bea', 
	subscriptionKey: '17d9abb7557e4842a2bf77069a42983a',
    top: 4});

    var intents = new builder.IntentDialog({ recognizers: [qnarecognizer] });
    
    bot.dialog('/', intents);
    
    intents.matches('qna', [
        function (session, args, next) {
            var answerEntity = builder.EntityRecognizer.findEntity(args.entities, 'answer');
            session.send(answerEntity.entity);
        }
    ]);
    
    intents.onDefault([
        function(session){
            session.send('Sorry!! No match!!');
        }
    ]);

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')

// var bot = new builder.UniversalBot(connector, function (session) {
//     session.send("You said: %s", session.message.text);
// });
