define([
    'app'
], function(App){
   var GameChoice = {};

    GameChoice.View = Backbone.View.extend({
            template: 'gameChoice/gameChoice',
            tagName: 'section',
            id: 'gameSection',

            events: {
                'tap li': 'getSums'
            },

            getSums: function(event){
                var target = $(event.target);
                if(target.attr('nodeName') !== 'li'){
                    target = $(target).parents('li');
                }
                var type = $(target).data('type');
                App.router.go('game', type);
            }
        });

        return GameChoice;
});