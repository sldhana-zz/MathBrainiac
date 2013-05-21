var server = require('../app/server').createServer();

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log('Started accepting requests');
});