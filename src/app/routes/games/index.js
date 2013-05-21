var _  = require('request'),
     GameFinder = require('../../models/gameFinder');

module.exports = function attachHandlers(router){
   router.get('/', showGame);
   router.get('/games/:id', getGame);
   router.get('/game/:type', showGame);
   router.get('/game/:type/complete', showGame);
   router.get('/games/settings/performance', showGame);
   router.get('/games/settings/options', showGame);
};

function showGame(req, res){
    res.render('games/index', {
        baseUrl: req.app.settings.baseUrl
    });
}

function getGame(req, res){
    var gameVersion = req.params.id;
    var gameOperation = req.query.type;
    var gameLevel = req.query.level;

    var gameFinder = new GameFinder();
    var sums = gameFinder.getGame({
        operation: gameOperation,
        version: gameVersion,
        level: gameLevel
    }, res, showResult);
}


function showResult(res){
    console.log(res);

}