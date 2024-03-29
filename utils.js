const https = require('https');

function show_calendar(input_year, input_month) {
    let date = new Date();
    let year = input_year;	// 年
    let month = input_month;	// 月
    let day = date.getDate();	// 日
    let last_day = new Date(year, month, 0).getDate()
    const fs = require('fs');
    console.log(month-1)
    // jsonファイル読み込み
    let file_path = year.toString() + month.toString() + '.json'
    try {
        let jsonObject = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    }
    catch{
        init_dataset(year, month)
    }
    let jsonObject = JSON.parse(fs.readFileSync(file_path, 'utf8'));

    contents = []
    calendar = []
    // 
    for (i = 0; i < new Date(year, month - 1, 1).getDay(); i++) {
        contents.push({
            type: "text",
            text: ' ',
            size: "sm",
            color: '#000000',
            align: "center"
        })
    }

    for (i = 1; i < last_day + 1; i++) {
        var userDate = new Date(year, month - 1, i)
        var weekday = userDate.getDay()
        var backgroundColor = '#FFFFFF'
        if (i == day) color = "#1db446"
        else if (weekday == 0) color = "#ff0000"
        else if (weekday == 6) color = "#0000ff"
        else color = '#000000'
        if (jsonObject[i] == true) backgroundColor = '#ffff00'
        day_contents = {
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "backgroundColor": backgroundColor,
            "contents": [{
                type: "text",
                text: i.toString(),
                size: "sm",
                color: color,
                align: "center",
                gravity: "center"
            }]
        }
        contents.push(day_contents)
        // console.log(i, weekday)
        if (weekday != 6) contents.push({ type: "separator" })

        if (i == last_day) {
            for (j = 0; j < 6 - weekday; j++) {
                contents.push({
                    type: "text",
                    text: ' ',
                    size: "sm",
                    color: '#000000',
                    align: "center"
                })
            }
        }

        if (weekday == 6 || i == last_day) {
            calendar.push({
                type: "box",
                layout: "horizontal",
                margin: "md",
                contents: contents
            })
            calendar.push({ type: "separator" })
            contents = []
        }
    }
    contents.push(
        {
            "type": "flex",
            "altText": "カレンダー",
            "contents": {
                "type": "bubble",
                "styles": {
                    "footer": {
                        "separator": true
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            type: "text",
                            text: month.toString() + "月",
                            weight: "bold",
                            color: "#1db446",
                            size: "md"
                        },
                        {
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
                                    "contents": weekday_header()
                                },
                                {
                                    "type": "separator"
                                },
                                ...calendar
                            ]
                        }
                    ]
                }
            }
        }
    )
    return contents
}
// 一週間を日本語に
function weekday_header() {
    weekdays = ['日', '月', '火', '水', '木', '金', '土']
    header = []
    for (k = 0; k < weekdays.length; k++) {
        if (weekdays[k] == '日') color = "#ff0000"
        else if (weekdays[k] == '土') color = "#0000ff"
        else color = '#000000'
        header.push({
            type: "text",
            text: weekdays[k],
            size: "sm",
            color: color,
            align: "center"
        })

        if (weekdays[k] != '土') header.push({ type: "separator" })
    }
    return header
}

// 洗濯した日にちを保存
function add_laundry_data() {
    const fs = require('fs');

    let date = new Date();
    let year = date.getFullYear();	// 年
    let month = date.getMonth() + 1;	// 月
    let day = date.getDate()
    let file_path = year.toString() + month.toString() + '.json'
    try {
        let jsonObject = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    }
    catch{
        init_dataset(year, month)
    }
    let jsonObject = JSON.parse(fs.readFileSync(file_path, 'utf8'));

    jsonObject[day] = true

    fs.writeFileSync(file_path, JSON.stringify(jsonObject, null, '    '), function (err, result) {
        if (err) console.log('error', err);
    });
}

// カレンダーの作成
function init_dataset(year, m) {
    var fr = require('fs');
    var datas = {}

    var last_day = new Date(year, m, 0).getDate()
    for (d = 1; d <= last_day; d++) {
        datas[d] = false
    }
    // console.log(datas)
    fr.writeFileSync(year.toString() + m.toString() + '.json', JSON.stringify(datas, null, '    '), function (err, result) {
        if (err) console.log('error', err);
    });
}
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
                "url": "https://www.techscore.com/blog/wp/wp-content/uploads/2016/12/gopher_ueda.png",
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

async function getWeather (latitude,longitude) {

    const yahoo_id = process.env.YAHOO_APPLICATION_ID;

    return new Promise((resolve,reject) => {
        const URL = "/weather/V1/place?coordinates=" + latitude + "," +  longitude + "&output=json&appid=" + yahoo_id;
        let receivedData = {"Data":"None"};

        const options = {
            protocol: 'https:',
            host: 'map.yahooapis.jp',
            path: URL,
            method: 'GET',
        };

        const req = https.request(options, (res) => {
            res.on('data', (data) => {
                receivedData = JSON.parse(data);
                receivedData = receivedData["Feature"][0]["Property"]["WeatherList"]["Weather"][0]["Rainfall"];
            });
            res.on('end', () => {
                console.log('No more data in response.');
                resolve(receivedData);
            });
        })
        req.on('error', (e) => {
        console.error(`problem with request:`);
        reject(`problem with request:`);
        });
        req.end();
    });
}

exports.show_calendar = show_calendar;
exports.if_rain = if_rain;
exports.add_laundry_data = add_laundry_data;
exports.getWeather = getWeather;