var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Worksheet = (function(){
    var Worksheet = new Schema({
        operation: {type: String, required: true, trim: true},
        type: {type: String, required: true, trim: true},
        created: {type: Date, default: Date.now },
            data: []
        });
        Worksheet = mongoose.model('Worksheet', Worksheet);
        return Worksheet;
}());

module.exports = Worksheet;


    
    