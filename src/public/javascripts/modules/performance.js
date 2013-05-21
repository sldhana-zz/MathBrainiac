define([
    'app',
    'lib/zingchart/zingchart-html5-min'
    ], function(App, Zingchart){
        var Performance = App.module();


        Performance.Views.Link = Backbone.View.extend({
            template: 'performance/link',
            tagName: 'li',
            events: {
                'tap #performance': 'showPerformance'
            },

            showPerformance: function(){
                App.router.go('games/settings/performance');
            }
        });

        Performance.Views.Detail = Backbone.View.extend({
            template: 'performance/detail',
            initialize: function(opts){
                this.data = opts.data;
            },
            serialize: function(){
                return{
                    data: this.data
                }
            }
        });
        return Performance;
    });