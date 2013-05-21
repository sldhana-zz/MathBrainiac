define(['modules/options', 'app', 'router'], function(Options, App, Router){
    describe('Module::OptionsView', function(){
        var options;
        beforeEach(function(){
            options = new Options.Views.View();
            App.router = new Router();

            spyOn(options, 'showEdit');
            $('#injectContent').html(options.render().view.$el);
        });

        afterEach(function(){
            options = null;
        });

        it('Options Template', function(){
            waits(500);

            runs(function(){
                expect($('#injectContent').html()).toMatch('<button id="options" class="btn btn-success btn-large">Options</button>');
            });
        });

        it('Events', function(){
            $('#options').trigger('tap');
            expect(options.showEdit).toHaveBeenCalled();
        });
    });


    describe('Module::OptionsEdit', function(){
        var options;
        beforeEach(function(){
            options = new Options.Views.Edit();
            App.router = new Router();

            spyOn(options, 'updateOptions');

            $('#injectContent').html(options.render().view.$el);
        });

        afterEach(function(){
            options = null;
        });

        it('Options Template', function(){
            waits(500);

            runs(function(){
                expect($('#injectContent').html()).toMatch('<legend>Change my game level:</legend>');
            });
        });

        it('Options Events', function(){
            $('#editOptions input:last-child').trigger('click');
            expect(options.updateOptions).toHaveBeenCalled();
            expect(options.settings).toBeDefined();
        });

    });
});