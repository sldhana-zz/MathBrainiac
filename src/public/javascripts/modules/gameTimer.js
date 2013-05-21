define([
    'app'
    ], function(App){
        var GameTimer = App.module();

        GameTimer.Model = Backbone.Model.extend({
            defaults: {
                begin: 0,
                end: 0
            },

            start: function(){
                this.set('begin', new Date().getTime());
            },

            finish: function(){
                this.set('end', new Date().getTime());
            },

            getTotalTime: function(){
                return this.get('end') - this.get('begin');
            }
        });
        return GameTimer;
    });