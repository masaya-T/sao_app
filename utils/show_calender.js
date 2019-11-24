const init_dataset = require("./init_dataset");
const weekday_header = require("./weekday_header");

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



module.exports.show_calendar = show_calendar;