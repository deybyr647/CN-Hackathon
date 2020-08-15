const fs = require('fs');

fs.readFile('data.json', 'utf-8', (err, filedata) => {
	let objectArray = JSON.parse(filedata);
	console.log(objectArray);
});