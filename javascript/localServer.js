let http = require('http');
let url = require('url');
let fs = require('fs');
let opn = require('opn');

console.log('Server now running at localhost:8080');
let server = http.createServer((request, response) => {
    let path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write('This is a test message!');
            response.end();
            break;

        case '/client/testHTML.html':
            fs.readFile(__dirname + path, (error, data) => {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;

        case '/client/testHTML1.html':
            fs.readFile(__dirname + path, (error, data) => {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;

        default:
            response.writeHead(404);
            response.write('Page does not exist!');
            response.end();
            break;
    }   
})

server.listen(8080);
opn('http://localhost:8080');

