define([
    'layoutManager'
    ], function(){
        //patch collection fetching event to emit "fetch" event
        Backbone.Collection.prototype.fetch = function(){
            var fetch = Backbone.Collection.prototype.fetch;
            return function(){
                this.trigger('fetch');
                return fetch.apply(this, arguments);
            };
        }();

        //global location to place configurations and module
        var app = {
            root: '/'
        };

        //Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        //Configure LayoutManager with Backbone Boilerplate defaults.
        Backbone.Layout.configure({
            //Allow LayoutManager to augment Backbone.View.prototype.
            manage: true,

            prefix: "javascripts/templates/",

            fetch: function(path) {
                path = path + ".html";

                if (JST[path]) {
                    return JST[path];
                }

                var done = this.async();
                $.get(app.root + path, function(contents) {
                    done(JST[path] = _.template(contents));
                });
            }
        });


        // Mix Backbone.Events, modules, and layout management into the app object.
        return _.extend(app, {
            layout: null,
            // Create a custom object with a nested Views object.
            module: function(additionalProps) {
                return _.extend({
                    Views: {}
                }, additionalProps);
            },

            // Helper for using layouts.
            useLayout: function(name, options) {
                // Enable variable arity by allowing the first argument to be the options
                // object and omitting the name argument.
                if (_.isObject(name)) {
                    options = name;
                }

                // Ensure options is an object.
                options = options || {};

                // If a name property was specified use that as the template.
                if (_.isString(name)) {
                    options.template = name;
                }


                // Create a new Layout with options.
                var layout = new Backbone.Layout(_.extend({
                    el: "body"
                }, options));

                // Cache the refererence.
                return this.layout = layout;
            }
        }, Backbone.Events);

    });