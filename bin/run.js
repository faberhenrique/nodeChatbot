'use strict';

const service = require('../server/service');
const slackClient = require('../server/slackClient')
const http = require('http')


const slackToken = '';
const slacLog = 'info';

const rtm = slackClient.init(slackToken, slacLog);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(3000)
    console.log("Server started")
})
const server = http.createServer(service);
server.on('listening', function () {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode`)
})