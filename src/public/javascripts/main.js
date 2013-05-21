require.config({
    paths: {
        'jquery': 'lib/jquery',
        'jquerymobile': 'lib/jquery.mobile.custom',
        'lodash': 'lib/lodash',
        'backbone': 'lib/backbone',
        'localStorage': 'lib/backbone.localStorage',
        'layoutManager': 'lib/backbone.layoutmanager',
        'constants': 'constants',

        //for loading text resources.  Require.js plugin
        'text': 'lib/text'
    },

    map: {
        //Ensure Lo-Dash is used instead of underscore.
        "*": {
            "underscore": "lodash"
        }
    },

    shim: {
        'lodash': {
            exports: '_'
        },
        'backbone': {
            deps: ['lodash', 'jquery', 'jquerymobile'],
            exports: 'Backbone'
        },
        layoutManager: {
            deps: ['backbone'],
            exports: 'Backbone.Layout'
        }
    }
});

require([
    'app',
    'router'
    ], function(App, Router){
        App.router = new Router();
        Backbone.history.start({
            pushState: true,
            root: App.root
        });
    });


