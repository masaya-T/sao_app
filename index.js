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
        events_processed.push(bot.replyMessage(event.replyToken, {
            type: "text",
            text: event.message.text+'!!'
        }));
        events_processed.push(bot.replyMessage(event.replyToken, {
            type: "flex",
            altText: "hogehoge",
            contents: {
                type: "bubble",
                styles: {
                    header: {
                        backgroundColor: "#ff62ae"
                    },
                    body: {
                        backgroundColor: "#5bff54"
                    },
                    footer: {
                        backgroundColor: "#7b78ff"
                    }
                },
                header: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "header"
                        }
                    ]
                },
                hero: {
                    type: "image",
                    url: "<imageUrl>",
                    size: "full",
                    aspectRatio: "1:1"
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "body"
                        }
                    ]
                },
                footer: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "footer"
                        }
                    ]
                }
            }
        }));
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});