var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Game = (function(){
    var Game = new Schema({
        id: {type: Number, required: true},
        sums: []
        });
        GameModel = mongoose.model('Game', Game);
        return {
            GameModel: GameModel,
            GameSchema: Game
        };
}());

module.exports = Game;


    
    