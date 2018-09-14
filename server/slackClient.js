'use strict';

let rtm =null
const  RTMClient  = require('@slack/client').RTMClient;
function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}
function addAuthenticatedHandler(rtm, handler) {
    rtm.on(rtm.connected, handler);
}


module.exports.init = function slackClient(token,logLevel){

    rtm = new RTMClient(token,{logLevel: logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on('message', (message) => {
        // For structure of `event`, see https://api.slack.com/events/message
      
        // Skip messages that are from a bot or my own user ID
        if ( (message.subtype && message.subtype === 'bot_message') ||
             (!message.subtype && message.user === rtm.activeUserId) ) {
          return;
        }
      
        // Log the message
        console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
      });
    return rtm;

}
module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
