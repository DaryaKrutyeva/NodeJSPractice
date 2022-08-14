const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url ==='/') {
        res.write('<html>');
        res.write('<head><title> Enter Message </title> </head>');
        res.write('<body><form action="/message" method="POST"><input type ="text" name="message"><button type = "submit"> SEND </button></form></body>');
        res.write('</html>');
        return res.end();

    }

    if(url ==='/message' && method ==='POST'){
        const body =[];
        req.on('data', (chunk) =>{
            body.push(chunk);


        });
        //event handling architecture where I request NodeJS to perform some action and it 
        // will offload the request to the operating system which does support multithreading
        //never blocks code and server
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
           

        })
       
       
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title> <head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();


});

server.listen(3000);



/** Some notes:
 * - nodejs uses one thread
 * - event loop automatically started by nodeJS, reponsible for handling event callbacks
 *   -will only handle callbacks that contain fast finishing code
 *   -1st checks for time callbacks(setTimeout, setInterval)
 *    then checks pending callbacks, i-o (file, network) related that were deferred
*    -3rd: poll phase - looks for new io events and executed callback immediately if possible or defer
*    -4th check: setImmediate callbacks
* -worker pool: runs on different threads, detached from code
 *      -once worker is done, will trigger callback, which will end up in event loop where it will be executed
 */