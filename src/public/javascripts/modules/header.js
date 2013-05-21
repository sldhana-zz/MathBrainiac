define(['app'], function(App){
    var Header = App.module();

    Header.View = Backbone.View.extend({
        template: 'header',
        className: 'container-fluid',
        tagName: 'div',

        events: {
            'tap #home': 'goHome'
        },

        goHome: function(){
            App.router.go('/');
        }
    });

    return Header;
});