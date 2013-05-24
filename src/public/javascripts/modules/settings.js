define([
    'lodash',
    'constants',
    'localStorage',
    'modules/utility'
    ], function(_, Constants, Storage, Utility){
        var Settings = {};
        Settings.Model = Backbone.Model.extend({
            localStorage: null,
            defaults:{
                gameTypeRanking: [{
                    type: Constants.getConstant('gameType').ADDSUB,
                    version: 0,
                    scores:[],
                    rank: 1
                },
                {
                    type: Constants.getConstant('gameType').MULTDIV,
                    version: 0,
                    scores: [],
                    rank: 1
                }],
                level: Constants.getConstant('gameLevel').EASY,
                lastGame: Constants.getConstant('gameType').ADDSUB,
                penalty: 1000 //1 second
            },

            initialize: function(options){
                options || ( options = {});
                this.localStorage = new Storage(options.name);
                //only save this settings if no records available
                if(this.localStorage.records.length === 0){
                    this.save();
                }
                this.levelCalculator();
            },

            fetch: function(){
                Backbone.Model.prototype.fetch.call(this, {
                    success: this.setupSettings,
                    error: this.processError
                });
            },

            calculateRank: function(gameType, totalTime, totalErrors){
                var gameSettings = this.getGameTypeData(gameType);
                totalTime = totalTime + (totalErrors * this.get('penalty'));
                gameSettings.scores.push({
                    time: totalTime,
                    type: this.get('level'),
                    errors: totalErrors
                });
                var version = parseInt(gameSettings.version, 10)
                var allScores = gameSettings.scores;
                var lastScore = _.last(allScores).time;
                var scores = _.pluck(allScores, 'time').sort(function(a, b){
                    return (a-b);
                });
                var rank = _.indexOf(scores, lastScore, 0);
                gameSettings.rank = rank + 1;
                this.set('lastGame', gameType);
              //reset to 0
                if(version === 100){
                    version = 0;
                }
                
                gameSettings.version = version + 1;
                this.save();
            },

            getGameTypeData: function(type){
                var gameSettings = _.find(this.get('gameTypeRanking'), function(gameType){
                    return gameType.type === type
                });
                return gameSettings;
            },

            getLastScore: function(){
                var gameSettings = this.getGameTypeData(this.get('lastGame'));
                var allScores = gameSettings.scores;
                var time = Utility.friendlyTime(_.last(allScores).time);
                var lastErrorCount = _.last(gameSettings.scores).errors;
                var penalty = Utility.friendlyTime(lastErrorCount * this.get('penalty'));
                return {
                    totalGamesPlayed: gameSettings.scores.length,
                    timeScore: time.time + ' ' + time.type,
                    rank: gameSettings.rank,
                    errors: lastErrorCount,
                    penalty: penalty.time + ' ' + penalty.type
                };
            },

            getAllScoresByType: function(){
                var gameSettings = this.getGameTypeData(this.get('lastGame'));
                var allScores = gameSettings.scores;
                return allScores;
            },

            getAllScores: function(){
                var addSubScores = this.getGameTypeData(Constants.getConstant('gameType').ADDSUB);
                var multDivScores = this.getGameTypeData(Constants.getConstant('gameType').MULTDIV);

                addSubScores = addSubScores.scores;
                multDivScores = multDivScores.scores;

                if(addSubScores.length > 0){
                    if(addSubScores.length > 10){
                        addSubScores = addSubScores.slice(-10);
                    }
                    else{
                        addSubScores = addSubScores.slice(-addSubScores.length);
                    }
                }

                if(multDivScores.length > 0){
                    if(multDivScores.length > 10){
                        multDivScores = multDivScores.slice(-10);
                    }
                    else{
                        multDivScores = multDivScores.slice(-multDivScores.length);
                    }
                }

                var addSubScoreList = _.pluck(addSubScores, 'time');
                var multDivScoreList = _.pluck(multDivScores, 'time');
                return {
                    addSub: addSubScoreList,
                    multDiv: multDivScoreList
                };
            },

            levelCalculator: function(){
                var self = this;
                var gameTypes = Constants.getConstant('gameType');
                _.forEach(gameTypes, function(type, key){
                    var gamesInLevel = self.getGameTypeData(type);
                });
            },

            setupSettings: function(resp, status, xhr){
            //console.log(resp, status, xhr, "success");
            },

            processError: function(resp, status, xhr){
            //console.log(resp, status, xhr);
            }
        });

        return Settings;
    });



