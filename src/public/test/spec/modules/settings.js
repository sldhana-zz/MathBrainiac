define(['modules/settings', 'lodash',
    'backbone',
    'constants',
    'localStorage'], function(Settings, _, Backbone, Constants, Storage){
        describe('Module::Settings', function(){
            var settings;
            beforeEach(function(){
                settings = new Settings.Model({
                    id: 1,
                    name: "TestStorage"
                });
                settings.set()


            });

            afterEach(function(){
                settings.destroy();
            });

            it('Check level settings', function(){
                settings.set('level', Constants.getConstant('gameLevel').MEDIUM);
                expect(settings.get('level')).toEqual('medium')
            });

            it('Calculate rank for add sub', function(){
                settings.calculateRank(Constants.getConstant('gameType').ADDSUB, 500, 0);
                settings.calculateRank(Constants.getConstant('gameType').ADDSUB, 560, 0);
                settings.calculateRank(Constants.getConstant('gameType').ADDSUB, 100, 0);

                var gameSettings = settings.getGameTypeData(Constants.getConstant('gameType').ADDSUB);
                expect(gameSettings.scores.length).toEqual(3);
                expect(gameSettings.rank).toEqual(1);
            });

            it('Calculate rank for mult div', function(){
                settings.calculateRank(Constants.getConstant('gameType').MULTDIV, 540, 0);
                settings.calculateRank(Constants.getConstant('gameType').MULTDIV, 240, 0);

                var gameSettings = settings.getGameTypeData(Constants.getConstant('gameType').MULTDIV);
                expect(gameSettings.scores.length).toEqual(2);
                expect(gameSettings.rank).toEqual(1);
            });

            it('Get last score', function(){
                settings.calculateRank(Constants.getConstant('gameType').MULTDIV, 540, 0);
                settings.calculateRank(Constants.getConstant('gameType').ADDSUB, 240, 0);

                var gameSettings = settings.getLastScore();
                expect(gameSettings.totalGamesPlayed).toEqual(1);
                expect(gameSettings.timeScore).toEqual('240 milliseconds');
            });
            
            it('Get last score with errors', function(){
                settings.calculateRank(Constants.getConstant('gameType').MULTDIV, 540, 0);
                settings.calculateRank(Constants.getConstant('gameType').ADDSUB, 240, 2);

                var gameSettings = settings.getLastScore();
                expect(gameSettings.totalGamesPlayed).toEqual(1);
                expect(gameSettings.timeScore).toEqual('2.24 seconds');
            });

        });
    });