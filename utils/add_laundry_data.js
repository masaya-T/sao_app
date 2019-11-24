const init_dataset = require("./init_dataset");
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

module.exports.add_laundry_data = add_laundry_data;
