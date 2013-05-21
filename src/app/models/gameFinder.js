var _  = require('underscore'),
mongojs = require('mongojs'),
db = null;

var GameFinder = (function(){
    function Constr(){
        this.type = null;
        this.version = 1;
        this.operation = null;
        var uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/Worksheets';
        db = mongojs.connect(uriString, ['worksheets']);
    }

    Constr.prototype = {
        getGame: function(opts, res, callback){
            db.worksheets.find({
                'operation': opts.operation,
                'type': opts.level,
                'data.id': parseInt(opts.version, 10)
                }, {'data.$': 1}, function(err, worksheet){
                    if(err|| !worksheet) {
                        res.send(err);
                    }
                    else{
                        res.json(worksheet[0].data[0].sums);
                    }
                });
        }
    }
    return Constr;
}());

module.exports = GameFinder;