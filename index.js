// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const utils = require("./utils");
const bodyParser = require('body-parser');
// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

const yagi_line_id = process.env.YAGI_LINE_ID;

// -----------------------------------------------------------------------------


// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

server.use('/api/v1/photo', bodyParser.json());
server.use('/api/v1/photo', bodyParser.urlencoded({ extended: true }));

// Webサーバー設定
server.listen(process.env.PORT || 3000);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];
    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text") {
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text.match("カレンダー")) {
                console.log(event.message.text)
                let text=event.message.text.split(' ')
                if (text.length==1){
                    let date = new Date();
                    calendar = utils.show_calendar(date.getFullYear(),date.getMonth()+1)
                }
                else if (text.length == 2) {
                    let date = new Date();
                    calendar = utils.show_calendar(text[1],date.getMonth()+1)
                }
                else if (text.length == 3) {
                    calendar = utils.show_calendar(text[1], parseInt(text[2],10))
                }
                events_processed.push(bot.replyMessage(event.replyToken, {
                    "type": calendar[0]["type"],
                    "altText": calendar[0]["altText"],
                    "contents": calendar[0]["contents"]
                }));

            }else if (event.message.text == "雨") {
                const latitude  = "136.9745761";
                const longitude = "35.1355294";
                let weather = "none";

                (async () => {
                    weather = await utils.getWeather(latitude,longitude);
        
                    events_processed.push(bot.replyMessage(event.replyToken, {
                        type: "text",
                        text: weather.toString()
                    }));
                })();
                //utils.if_rain(bot,event)
            }
            
        }
    });
    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );

});

//仮のpostサーバ
server.post('/api/v1/photo', function (req, res) {

    const photo = req.body.PhotoURL;

    const message = {
        type: 'image',
        originalContentUrl: photo
    };

    bot.pushMessage(yagi_line_id, message)
        .then(() => {
            res.send('Success to send a message to Yagijin')
        })
        .catch((err) => {
            console.log(err);
    });
})
