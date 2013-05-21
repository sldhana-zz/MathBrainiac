define(['modules/gameChoice', 'app', 'router'], function(GameChoice, App, Router){
    describe('Module::GameChoice', function(){
        var gameChoice;
        beforeEach(function(){
            gameChoice = new GameChoice.View();
            App.router = new Router();

            spyOn(gameChoice, 'getSums');
            $('#injectContent').html(gameChoice.render().view.$el);
        });

        afterEach(function(){
            gameChoice = null;
        });

        it('GameChoiceTemplate', function(){
            waits(500);

            runs(function(){
                expect($('#injectContent').html()).toMatch('Add / Subtract');
            });
        });

        it('GameChoice Events', function(){
            $('#gameSection ul li:first-child').trigger('tap');
            expect(gameChoice.getSums).toHaveBeenCalled();
        });
    });
});