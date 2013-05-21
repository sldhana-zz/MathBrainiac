var _  = require('underscore'),
    mongojs = require('mongojs'),
    db = null;

var SumMaker = (function(){
    var config = {
        questionBreakdown:{
            easy:{
                easy:20
            },
            medium: {
                easy: 5,
                medium: 15
            },
            hard: {
                easy: 5,
                medium: 5,
                hard: 10
            }
        },
        questionDifficulty:{
            addSub: {
                easy: '0-9',
                medium: '10-50',
                hard: '51-99'
            },
            multDiv: {
                easy: '0-5',
                medium: '6-10',
                hard: '11-15'
            }

        },
        operation: {
            plus: '+',
            minus: '-',
            multiplication: '*',
            division: '/'
        }
    }

    function Constr(){
        this.level = 'easy';
        this.operation = 'addSub'
        var uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/Worksheets';
        db = mongojs.connect(uriString, ['worksheets']);
        db.worksheets.remove();
    }

    function generateSumCollection(type, total, operation){
        var difficulty = config.questionDifficulty[operation][type],
        difficultyArr = difficulty.split('-'),
        min = parseInt(difficultyArr[0], 10),
        max = parseInt(difficultyArr[1], 10),
        sums = [];
        if(operation === 'addSub'){
            for(var i = 0; i < total; i++){
                sums.push(createAddSubSum(min, max));
            }
        }
        else{
            for(var i = 0; i < total; i++){
                sums.push(createMultDivSum(min, max));
            }
        }

        return sums;
    }

    function createMultDivSum(min, max){
        var operand1 = _.random(min, max);
        var operand2 = _.random(min, max);
        //dont't want operand1 to ever be 0 for division purposes
        while(operand1 === 0){
            operand1 = _.random(min, max);
        }
        var operation = _.random(0,1);

        //if operation is division, need to switch values so results are only
        if(operation === 1 && (operand1 % operand2 !== 0)){
            var temp = operand1;
            operand1 = operand1 * operand2;
            operand2 = temp;
        }

        return {
            operand1: operand1,
            operand2: operand2,
            operation: operation === 0 ? '*' : '/'
        };
    }

    /*TODO: should have ngative numbers ? */
    function createAddSubSum(min, max){
        var operand1 = _.random(min, max);
        var operand2 = _.random(min, max);
        var operation = _.random(0,1);

        //if minus, switch so larger number is operand1
        if(operation === 1){
            if(operand1 - operand2 < 0){
                var temp = operand1;
                operand1 = operand2;
                operand2 = temp;
            }
        }
        return {
            operand1: operand1,
            operand2: operand2,
            operation: operation === 0 ? '+' : '-'
        };
    }

    function save(data, operation, level){
        //var worksheet = new Worksheet();
        db.worksheets.save({
            operation: operation,
            type: level,
            data: data
        }, function(err, saved){
            if(err || !saved){
                console.log("issue saving", err);
            }
            else{
                console.log("Saved new worksheets");
            }
        });
    }

    Constr.prototype = {
        setLevel: function(level){
            this.level =  level;
        },

        setOperation: function(operation){
            this.operation = operation;
        },

        close: function(){
            mongoose.disconnect();
        },

        create: function(totalToGenerate){
            var worksheets = [],
            breakdown = config.questionBreakdown[this.level];

            for(var i = 1; i <= totalToGenerate; i++){
                var sums = [];
                for(type in breakdown){
                    sums = sums.concat(generateSumCollection(type, breakdown[type], this.operation));
                }
                var game = {};
                game.id = i;
                game.sums = sums;
                worksheets.push(game);

            }
            save(worksheets, this.operation, this.level);
        }
    };

    return Constr;

}());

module.exports = SumMaker;