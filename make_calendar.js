export default function make_calendar() {
    let date = new Date();
    let year = date.getFullYear();	// 年
    let month = date.getMonth() + 1;	// 月
    let day = date.getDate();	// 日
    let last_day = new Date(year, month, 0).getDate()

    contents = []
    calendar = []
    
    for (i = 0; i < new Date(year, month - 1, 1).getDay();i++){
        contents.push({
            type: "text",
            text: ' ',
            size: "sm",
            color: '#000000',
            align: "center"
        })
    }

    for (i = 1; i <last_day+1;i++){
        var userDate =new Date(year,month-1,i)
        var weekday = userDate.getDay()

        if (i == day) color = "#1db446"
        else if (weekday == 0) color = "#ff0000"
        else if (weekday == 6) color = "#0000ff"
        else    color = '#000000'

        day_contents={
            type: "text",
            text: i.toString(),
            size: "sm",
            color: color,
            align: "center",
            gravity: "center"
        }
        contents.push(day_contents)
        if (weekday == 6) contents.push({ type: "separator" })

        if (i==last_day){
            for(j=0;i<6-weekday;j++){
                contents.push({
                    type: "text",
                    text: ' ',
                    size: "sm",
                    color: '#000000',
                    align: "center"
                })
            }
        }

        if (weekday==0 || i==last_day){
            calendar.push({
                type: "box",
                layout: "horizontal",
                margin: "md",
                contents: contents
            })
            calendar.push({ type: "separator" })
            contents=[]
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
                        text: month.toString()+"月",
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
function weekday_header(){
    weekdays =['日', '月', '火', '水' ,'木' ,'金' ,'土']
    header = []
    for(k=0;k<weekdays.length;k++){
        if( weekdays[k] == '日') color = "#ff0000"
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
