// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        var date = new Date();
        var year = date.getFullYear();	// 年
        var month = date.getMonth() + 1;	// 月
        var day = date.getDate();	// 日
        var hour = date.getHours();	// 時
        var minute = date.getMinutes();	// 分
        var second = date.getSeconds();	// 秒
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text") {
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text == "こんにちは") {
                var today = new Date();
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: year,month
                }));
            }
        }
        events_processed.push(bot.replyMessage(event.replyToken, {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "actions": [
                    {
                        "type": "message",
                        "label": "アクション 1",
                        "text": "アクション 1"
                    },
                    {
                        "type": "message",
                        "label": "アクション 2",
                        "text": "アクション 2"
                    },
                    {
                        "type": "message",
                        "label": "アクション 3",
                        "text": "アクション 3"
                    }
                ],
                "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                "title": "タイトルです",
                "text": "テキストです"
            }
        }))
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});