define([
    'app',
    'constants',
    'modules/settings'
    ], function(App, Constants, Settings){
        var Options = App.module();

        Options.Views.View = Backbone.View.extend({
            template: 'options/view',
            tagName: 'li',

            events: {
                'tap #options': 'showEdit'
            },

            showEdit: function(){
                App.router.go('games/settings/options');
            }
        });

        Options.Views.Edit = Backbone.View.extend({
            template: 'options/edit',
            events: {
              'change input': 'updateOptions'
            },

            initialize: function(){
                this.settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                this.settings.fetch();
            },

            serialize: function () {
                var level = this.settings.get('level');
                return {
                    level: level
                };
            },

            updateOptions: function(event){
                this.settings.set('level', $(event.target).val());
                this.settings.save();
                App.router.go('/');
            }
        });
        return Options;
    });