define([
    'app',
    'constants',
    'modules/settings',
    'modules/utility'
    ], function(App, Constants, Settings, Utility){
        var Score = App.module();

        Score.Views.Item = Backbone.View.extend({
            template: 'score/score',
            tagName: 'section',
            id: 'score',

            serialize: function () {
                return {
                    model: this.model
                };
            }
        });

        Score.Views.List = Backbone.View.extend({
           template: 'score/list',

           serialize: function(){
               var total = this.collection.length;
               var begin = 0;
               if(total > 5){
                   begin = total - 5;
               }
               
               var collection = _.rest(this.collection, begin).reverse();
               _.map(collection, function(item){
                   item.time = Utility.friendlyTime(item.time)
               });

               return {
                   collection: collection
               };
           }
        });

        Score.Collection = Backbone.Collection.extend({
            initialize: function(){
                var settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                settings.fetch();
            }
        });


        return Score;
    });