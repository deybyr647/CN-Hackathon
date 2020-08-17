var results = data.results;
var table = document.getElementById("table");
for(var i = 0; i < results.length; i++) {
	var entry = results[i];
	var row = document.createElement("tr");

	var time_td = document.createElement("td");
	var time = document.createTextNode(entry.time);
	time_td.appendChild(time);
	row.appendChild(time_td);

	var app_td = document.createElement("td");
	var app = document.createTextNode(entry.app);
	app_td.appendChild(app);
	row.appendChild(app_td);

    let finalMoodResult;
    let finalMoodConfidence;
	Object.keys(entry.data).reduce((a, b) => {
        if(entry.data[a] > entry.data[b]){
            finalMoodResult = a;
        } else if (entry.data[a] < entry.data[b]) {
			finalMoodResult = b;
		}
    });
	finalMoodConfidence = entry.data[`${finalMoodResult}`];

	var pred_td = document.createElement("td");
	var pred = document.createTextNode(finalMoodResult);
	pred_td.appendChild(pred);
	row.appendChild(pred_td);

	var conf_td = document.createElement("td");
	var conf = document.createTextNode(finalMoodConfidence);
	conf_td.appendChild(conf);
	row.appendChild(conf_td);

	table.appendChild(row);
}