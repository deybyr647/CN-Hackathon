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

	table.appendChild(row);
}