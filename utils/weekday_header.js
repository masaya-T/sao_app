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

module.exports.weekday_header = weekday_header;