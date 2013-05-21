exports.attachHandlers = function attachHandlers(server){
    require('./generator')(server),
    require('./games')(server);
    require('./tests')(server);
}