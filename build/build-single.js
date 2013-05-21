({
    baseUrl: "../src/public/javascripts",
    /*appDir: "../src/",
    dir: "../dist",
    modules: [
        {
            name: "main"
        }
    ],*/
    name: "main",
    out: "main-built.js",
    paths: {
        // libraries path
        'jquery': 'lib/jquery',
        'lodash': 'lib/lodash',
        'backbone': 'lib/backbone.min',
        'localStorage': 'lib/backbone.localStorage',
        'layoutManager': 'lib/backbone.layoutmanager',
        'constants': 'constants',

        // require plugins
        'text': 'lib/text'
    }
})