var _  = require('underscore');

var SumMaker = (function(){
    function Constr(){
        this.level = 0;
    }
    
    Constr.prototype = {
        config: {
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
                easy: '0-9',
                medium: '10-50',
                hard: '51-99'
            },
            operation: {
                plus: '+',
                minus: '-',
                multiplication: '*',
                division: '/'
            }
        },
    
        setLevel: function(level){
            this.level =  level; 
        },
  
        create: function(totalToGenerate){
            var worksheets = [],
            breakdown = conf.questionBreakdown[this.level],
            sums = [];
            
            for(var i = 0; i < totalToGenerate; i++){
                for(type in breakdown){
                    sums = sums.concat(this.generateSumCollection(type, breakdown[type], conf.operation.plus));
                } 
                worksheets.push(sums);
            }
            console.log(worksheets);
            return worksheets;
        },
    
        generateSumCollection: function(type, total, operation){
            var difficulty = conf.questionDifficulty[type],
            difficultyArr = difficulty.split('-'),
            min = parseInt(difficultyArr[0], 10),
            max = parseInt(difficultyArr[1], 10),
            sums = [];
            for(var i = 0; i < total; i++){
                sums.push(this.createSum(min, max, operation));   
            }
            return sums;
        },
  
        createSum: function(min, max, operation){
            var operand1 = _.random(min, max);
            var operand2 = _.random(min, max);
    
            return {
                operand1: operand1,
                operand2: operand2,
                operation: operation
            };
        }
    };
    
    return Constr;
    
}());

module.exports = SumMaker;