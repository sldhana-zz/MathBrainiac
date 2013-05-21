var express = require('express'),
    routes = require('./routes');
    
exports.createServer = function createServer(){
    var server = express();
    server.set('views', __dirname + '/views');
    server.set('view engine', 'ejs');
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '../../public'));
    routes.attachHandlers(server);
    return server;
};