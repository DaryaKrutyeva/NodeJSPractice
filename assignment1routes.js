const fs = require('fs');



const requestHandler =(req, res) =>{
    const url = req.url;
    const method = req.method;

    if (url ==='/') {
        res.write('<html>');
        res.write('<body><h1> Hello User </h1> </body>');
        res.write('<body><form action="/create-user" method="POST"><input type ="text" name="username"><button type = "submit"> Create User </button></form></body>');
        res.write('</html>');
        return res.end();
    
    }
    
    if(url ==='/create-user' && method ==='POST'){
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

    if (url === '/users'){

        res.write('<html>');
        res.write('<head><title> Hello User </title> </head>');
        res.write('<li> Darya </li> <li> Fredo </li>')
        res.write('</html>');
        return res.end();
    
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title> <head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};


module.exports = requestHandler;

