var express = require('express'),
    routes = require('./routes');

exports.createServer = function createServer(){
    var server = express();
    server.set('views', __dirname + '/views');
    server.set('view engine', 'ejs');
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '../../public'));
    routes.attachHandlers(server);


    server.configure('development', function(){
        server.set('baseUrl', 'http://localhost:3000/');
    });

    server.configure('production', function(){
        server.set('baseUrl', 'http://calm-island-9905.herokuapp.com/');
    });

    return server;
};

