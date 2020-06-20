let http = require('http');
let fs = require('fs');
let url = require('url');
const { Console } = require('console');

//Create the server
http.createServer( (req, res) => {
    //pass the request with the file name 
    let pathname = url.parse(req.url).pathname;
    console.log("Request for" + pathname + "recieved")

    //Read the requested file content from the file system
    fs.readFile(pathname.substr(1),
    (err, data) => {
        if(err) {
            console.log(err);
            //HTTP status 404: NOT FOUND
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            //HTTP status 200 : OKAAAAAY
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            //Write the content of the file response body
            res.write(data.toString());
        }
        res.end();
    });
}).listen(8081);

//Print this on the console
console.log('Server running at http://127.0.0.1:8081/');