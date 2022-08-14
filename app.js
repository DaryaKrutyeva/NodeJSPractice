const http = require('http');
const routes = require('./routes');




const server = http.createServer(routes);

server.listen(3000);



/** Some notes:
 * - nodejs uses one thread
 * - event loop automatically started by nodeJS, reponsible for handling event callbacks
 *   -will only handle callbacks that contain fast finishing code
 *   -1st checks for time callbacks(setTimeout, setInterval)
 *    then checks pending callbacks, i-o (file, network) related that were deferred
*    -3rd: poll phase - looks for new io events and executed callback immediately if possible or defer
*    -4th check: setImmediate callbacks
    -5th: close - execute all close event callbacks
* -worker pool: runs on different threads, detached from code
 *      -once worker is done, will trigger callback, which will end up in event loop where it will be executed
 */