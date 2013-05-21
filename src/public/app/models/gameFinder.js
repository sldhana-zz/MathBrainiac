var _  = require('underscore'),
mongoose = require('mongoose');
Worksheet = require('./schemas/worksheet');

var GameFinder = (function(){
    function Constr(){
        this.type = null;
        this.version = 1;
        this.operation = null;
        var uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/Worksheets';
        mongoose.connect(uriString);
        //mongoose.connect('mongodb://localhost/Worksheets');
    }

    Constr.prototype = {
        getGame: function(opts, res, callback){
            var db = mongoose.connection;
            db.once('open', function(){
                Worksheet.find({
                    'operation': opts.operation,
                    'type': opts.level,
                    'data.id': parseInt(opts.version, 10)
                }, {'data.$': 1}, function(err, worksheet){
                    if(err){
                       res.send(err);
                    }
                    else{
                        res.json(worksheet[0].data[0].sums);
                        db.close();
                    }
                });
            });
        }
    }

    return Constr;

}());

module.exports = GameFinder;