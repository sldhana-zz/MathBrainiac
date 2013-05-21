var _  = require('underscore'),
    SumMaker = require('../../models/sumMaker');

module.exports = function attachHandlers(router){
   router.get('/generator', createSums);
   router.get('/generator/new', newSums);
   router.post('/generator', createSums);
};

function listSums(req, res){
    res.render('generator/index', { title: 'Express' });
}

function newSums(req, res){
    var sumMaker = new SumMaker();
}

function createSums(req, res){
    var sumMaker = new SumMaker();
    var levels = ['easy', 'medium', 'hard'];
    _.each(levels, function(element, index){
        sumMaker.setLevel(element);
        sumMaker.setOperation('addSub');
        var worksheets = sumMaker.create(100);

        sumMaker.setOperation('multDiv');
        var worksheets = sumMaker.create(100);
        sumMaker.close();
        res.send(200);
    });
}