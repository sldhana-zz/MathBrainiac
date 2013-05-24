define([
    'app',
    'constants',
    'modules/sum',
    'modules/gameChoice',
    'modules/gameBoard',
    'modules/settings',
    'modules/score',
    'modules/options',
    'modules/performance',
    'modules/header'
    ], function(App, Constants, Sum, GameChoice, GameBoard, Settings, Score, Options, Performance, Header){
        var Router = Backbone.Router.extend({

            routes: {
                '': 'index',
                'game/:type': 'getGame',
                'game/:type/complete': 'endGame',
                'games/settings/options': 'editOptions',
                'games/settings/performance': 'performance'
            },

            initialize: function(){
                var collections = {
                    sums: new Sum.Collection()
                };

                _.extend(this, collections);
            },

            index: function(){

                this.layout = App.useLayout('layout').setViews({
                    'header': new Header.View(),
                    '#board': new GameChoice.View(),
                    '#footer ul': new Options.Views.View()
                });
                this.layout.insertView('#footer ul', new Performance.Views.Link());
                 //remove home button from homepage
                this.layout.on('afterRender', function() {
                   $('#home').hide();
                });


                this.layout.render();

            },

            getGame: function(type){
                var self = this;
                var settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                settings.fetch();
                var gameTypeSettings = settings.getGameTypeData(type);

                this.sums.fetch({
                    params: {
                        type: type,
                        level: settings.get('level'),
                        id: parseInt(gameTypeSettings.version, 10)
                    },
                    success: function(data){
                        self.setupGame(data.models, gameTypeSettings);
                    },
                    error: function(data){
                        console.log(data);
                    }
                });
            },

            endGame: function(){
                var settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                settings.fetch();

                this.layout = App.useLayout('score/layout').setViews({
                    'header': new Header.View(),
                    '#recentScore': new Score.Views.Item({
                        model: settings.getLastScore()
                    }),
                    '#previousScores': new Score.Views.List({
                        collection: settings.getAllScoresByType()
                    }),
                    '#footer ul': new Options.Views.View()
                });
                this.layout.insertView('#footer ul', new Performance.Views.Link());
                this.layout.render();
            },

            setupGame: function(models, gameTypeSettings){
                if(this.gameBoard){
                    this.gameBoard.cleanupEvents();
                }

                this.gameBoard = new GameBoard.Model({
                    collection: models,
                    gameType: gameTypeSettings
                });
            },

            editOptions: function(){
                this.layout = App.useLayout('layout').setViews({
                    'header': new Header.View(),
                    '#board': new Options.Views.Edit(),
                    '#footer ul': new Performance.Views.Link()
                });
                this.layout.render();
            },

            performance: function(){
                var settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                settings.fetch();

                this.layout = App.useLayout('layout').setViews({
                    'header': new Header.View(),
                    '#board': new Performance.Views.Detail({
                        data: settings.getAllScores()
                    }),
                    '#footer ul': new Options.Views.View()
                });
                this.layout.render();
            },

            //Shortcut for building a url.
            go: function() {
                return this.navigate(_.toArray(arguments).join("/"), true);
            }


        });
        return Router;
    });