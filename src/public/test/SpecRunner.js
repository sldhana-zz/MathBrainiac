require.config({
    baseUrl: '../javascripts/',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jquery': 'lib/jquery',
        'jquerymobile': 'lib/jquery.mobile.custom',
        'lodash': 'lib/lodash',
        'backbone': 'lib/backbone',
        'localStorage': 'lib/backbone.localStorage',
        'layoutManager': 'lib/backbone.layoutmanager',
        'constants': 'constants',
        'text': 'lib/text',
        'jasmine': '../test/lib/jasmine',
        'jasmine-html': '../test/lib/jasmine-html',
        'spec': '../test/spec'
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
        'layoutManager': {
            deps: ['backbone'],
            exports: 'Backbone.Layout'
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
    specs.push('spec/modules/gameChoice');
    specs.push('spec/modules/gameTimer');
    specs.push('spec/modules/options');
    specs.push('spec/modules/settings');
    specs.push('spec/modules/sum');

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
