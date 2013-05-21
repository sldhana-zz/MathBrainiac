({
    appDir: "../src/",
    baseUrl: "public/javascripts",
    dir: "../dist",
    modules: [
        {
            name: "main"
        }
    ],
    mainConfigFile: "../src/public/javascripts/main.js",
    optimizeCss: "standard",
    paths: {
        // libraries path
        'jquery': 'lib/jquery',
        'lodash': 'lib/lodash',
        'backbone': 'lib/backbone',
        'localStorage': 'lib/backbone.localStorage',
        'layoutManager': 'lib/backbone.layoutmanager',
        'constants': 'constants',

        // require plugins
        'text': 'lib/text'
    },

    uglify2: {
        output: {
            beautify: true
        },
        compress: {
            sequences: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false
    }
})