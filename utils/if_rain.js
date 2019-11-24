
// 雨が降りそう
function if_rain(bot,event){
    // replyMessage()で返信し、そのプロミスをevents_processedに追加。
    bot.replyMessage(event.replyToken, {
        // events_processed.push(bot.replyMessage(event.replyToken,{
        "type": "flex",
        "altText": "雨",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": "https://github.com/masaya-T/sao_app/blob/master/lena.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "action": {
                    "type": "uri",
                    "uri": "http://linecorp.com/"
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "雨が降りそうです",
                        "weight": "bold",
                        "size": "xl"
                    }
                ]
            }
        }
    })
}

module.exports.if_rain = if_rain;