define(function(){
        var constants = {};

        constants.gameLevel = {
            EASY: 'easy',
            MEDIUM: 'medium',
            HARD: 'hard'
        };

        constants.gameType = {
            ADDSUB: 'addSub',
            MULTDIV: 'multDiv'
        };

        constants.time = {
            MS: 'milliseconds',
            SEC: 'seconds',
            MIN: 'minutes'
        },

        constants.storage = {
            NAME: 'Settings'
        }

        return {
            getConstant: function(type){
                return constants[type];
            }
        };
    });