const XLSX = require('xlsx');

//data0.csv
let data0_workbook = XLSX.read("./data0.csv", {
	type: "file",
});
let data0_sheetName = data0_workbook.SheetNames[0];
let data0_worksheet = data0_workbook.Sheets[data0_sheetName];
let data0_worksheet_json = XLSX.utils.sheet_to_json(data0_worksheet);

//data1.csv
let data1_workbook = XLSX.read("./data1.csv", {
	type: "file",
});
let data1_sheetName = data1_workbook.SheetNames[0];
let data1_worksheet = data1_workbook.Sheets[data1_sheetName];
let data1_worksheet_json = XLSX.utils.sheet_to_json(data1_worksheet);

let data0_index = 0;
let data1_index = 0;

for(; data1_index < data1_worksheet_json.length ;){
	let _data0_item = data0_worksheet_json[data0_index];
	let _data1_item = data1_worksheet_json[data1_index];
	if(_data1_item.time_exchange < _data0_item.time_exchange){
		data0_worksheet_json.splice(data0_index, 0, _data1_item);
		data1_index++;
	}
	else{
		if(data0_worksheet_json.length > data0_index + 1)
			data0_index++;
		else{
			//there has no elements need to compare in data0
			//push all data1 elements into data0, then break
			for(; data1_index < data1_worksheet_json.length ; data1_index++){
				data0_worksheet_json.push(data1_worksheet_json[data1_index]);
			}
			break;
		}
	}
}

let wb = XLSX.utils.book_new();
let ws = XLSX.utils.json_to_sheet(data0_worksheet_json);
let csv = XLSX.utils.sheet_to_csv(ws, {FS: ';'});
fs.writeFile(`./merge.csv`, csv, (err) => {
	if(err)
		console.log(err);
	else
		console.log("OK");
});