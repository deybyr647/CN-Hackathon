let express = require('express');
let app = express();
let opn = require('opn');

app.use(express.static('client'));

let server = app.listen(8080, () => {
	let host = server.address().address;
    let port = server.address().port;

	console.log(`Express App listening at http://localhost:${port}`);
})

opn('http://localhost:8080');

