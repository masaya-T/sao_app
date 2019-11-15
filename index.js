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
        const namami = {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": event.message.text + "?"
                    },
                    {
                        "type": "text",
                        "text": event.message.text + "!!"
                    }
                ]
            }
        };
        calender=make_calender()

        events_processed.push(bot.replyMessage(event.replyToken, {
            "type": "flex",
            "altText": "this is a flex message",
            "contents": calender
        }));
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );

});

function make_calender (){
    var date = new Date();
    var year = date.getFullYear();	// 年
    var month = date.getMonth() + 1;	// 月
    var day = date.getDate();	// 日
    contents = [{
        "type": "text",
        "text": month,
        "weight": "bold",
        "color": "#1db446",
        "size": "md"
    }]
    calender = [
        {
            "type": "bubble",
            "styles": {
                "footer": {
                    "separator": true
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": contents
            }
        }
    ]


    calender[0]["body"]["contents"].push({
        "type": "text",
        "text": "ここになにか説明",
        "size": "xs",
        "color": "#aaaaaa",
        "wrap": true
    },
        {
            "type": "box",
            "layout": "vertical",
            "margin": "md",
            "spacing": "md",
            "contents": [
                {
                    "type": "separator",
                    "margin": "md"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "日",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "月",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "火",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "水",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "木",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "金",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "土",
                            "size": "sm",
                            "color": "#0000ff",
                            "align": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": " ",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "text": " ",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "text": " ",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "text": " ",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "text": " ",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "text": "1",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "2",
                            "size": "sm",
                            "color": "#0000ff",
                            "align": "center",
                            "gravity": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "3",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "4",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "5",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "6",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "7",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "8",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "9",
                            "size": "sm",
                            "color": "#0000ff",
                            "align": "center",
                            "gravity": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "10",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "11",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "12",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "13",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "14",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "15",
                            "size": "sm",
                            "color": "#1db446",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "16",
                            "size": "sm",
                            "color": "#0000ff",
                            "align": "center",
                            "gravity": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "17",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "18",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "19",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "20",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "21",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "22",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "23",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "24",
                            "size": "sm",
                            "color": "#ff0000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "25",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "26",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "27",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "28",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "29",
                            "size": "sm",
                            "color": "#000000",
                            "align": "center",
                            "gravity": "center"
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "text",
                            "text": "30",
                            "size": "sm",
                            "color": "#0000ff",
                            "align": "center",
                            "gravity": "center"
                        }
                    ]
                },
                {
                    "type": "separator"
                }
            ]
        }
    )
    return calender
}