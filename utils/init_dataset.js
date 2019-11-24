
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

module.exports.init_dataset = init_dataset;