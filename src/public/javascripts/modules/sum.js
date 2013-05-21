define([
    'app'
    ], function(App){
        var Sum = App.module();

        Sum.View = Backbone.View.extend({
            template: 'gameBoard/sum',

            serialize: function () {
                return {
                    model: this.model
                };
            }


        });

        Sum.Model = Backbone.Model.extend({
            initialize: function(){
                this.calculateResult();
            },

            calculateResult: function(){
                var result = eval(this.get('operand1') + this.get('operation') + this.get('operand2'));
                this.set('result', result);
                if(this.get('operation') === '*'){
                    this.set('operation', 'x');
                }
            }
        });

        Sum.Collection = Backbone.Collection.extend({
            urlRoot: '/games/',
            model: Sum.Model,

            fetch: function(options){
                options  || (options = {});
                this.type = options.params.type;
                this.version = options.params.id;
                this.level = options.params.level;

                Backbone.Collection.prototype.fetch.call(this, options);
            },

            url: function(){
                return this.urlRoot + this.version + '?type='  + this.type + '&level=' + this.level;
            }
        });
        
        return Sum;
    });