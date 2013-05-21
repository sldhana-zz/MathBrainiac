define(['modules/gameTimer'], function(GameTimer){
    describe('Module::GameTimer', function(){
        var gameTimer;
        beforeEach(function(){
            gameTimer = new GameTimer.Model();
        });

        afterEach(function(){
            gameTimer = null;
        });

        it('GameTimerBegin', function(){
            gameTimer.start();
            expect(gameTimer.get('begin')).toBeGreaterThan(0);
        });

        it('GameTimerEnd', function(){
            gameTimer.start();
            gameTimer.finish();
            expect(gameTimer.get('end')).toBeGreaterThan(0);
        });

        it('GameTimerTotalTime', function(){
            gameTimer.set('begin', 10);
            gameTimer.set('end', 20);
            expect(gameTimer.getTotalTime()).toEqual(10);

        });
    });
});