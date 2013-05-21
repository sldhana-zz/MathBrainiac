var _  = require('underscore'),
     SumMaker = require('./models/sumMaker');

var sumMaker = new SumMaker();
var levels = ['easy', 'medium', 'hard'];
_.each(levels, function(element, index){
    sumMaker.setLevel(element);
    sumMaker.setOperation('addSub');
    sumMaker.create(100);

    sumMaker.setOperation('multDiv');
    sumMaker.create(100);
});



