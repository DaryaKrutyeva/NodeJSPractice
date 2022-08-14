const http = require('http');
const routes = require('./assignment1routes');




const server = http.createServer(routes);

server.listen(3000);