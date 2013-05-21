define([
    'lodash',
    'constants',
    ], function(_, Constants){
        var Utility = {

            friendlyTime: function(ms){
                var time = {};
                if(ms <= 1000){
                    time = {
                        time: ms,
                        type: Constants.getConstant('time').MS
                    };
                }
                else if(ms <= 60000){
                    time = {
                        time: (ms/1000).toFixed(2),
                        type: Constants.getConstant('time').SEC
                    };
                }
                else{
                    time = {
                        time: (ms/60000).toFixed(2),
                        type: Constants.getConstant('time').MIN
                    };
                }
                return time;
            }
        };
        return Utility;
    });