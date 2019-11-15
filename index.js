const express = require('express');
const linebot = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET
};
const app = express();

app.set('port', (process.env.PORT || 3030));
app.post('/', linebot.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});

const client = new linebot.Client(config);
function handleEvent(event) {
    this.line = event;
    switch (event.type) {
        case 'message':
            messageEvent();
            break;
        case 'follow':
            followEvent();
            break;
        case 'unfollow':
            unfollowEvent();
            break;
        default:
            return Promise.resolve(null);
    }
}

function messageEvent() {
    const {
        type,
        text,
    } = this.line.message;

    if (type !== 'text') {
        return Promise.resolve(null);
    }
    return client.replyMessage(this.line.replyToken, {
        type: 'text',
        text: text
    });
}

app.listen(app.get('port'), function () {
    console.log('Node app is running -> port:', app.get('port'));
});