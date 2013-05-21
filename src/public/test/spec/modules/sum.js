define(['modules/sum', 'app', 'router'], function(Sum, App, Router){
    describe('Module::Sum', function(){
        var sum;
        beforeEach(function(){
            sum = new Sum.Model();
            App.router = new Router();
        });

        afterEach(function(){
            sum = null;
        });

        it('Sum calculate addition sums', function(){
           sum.set('operand1', 10);
           sum.set('operand2', 5);
           sum.set('operation', '+');
           sum.calculateResult();
           expect(sum.get('result')).toEqual(15);
        });

        it('Sum calculate subraction sums', function(){
           sum.set('operand1', 10);
           sum.set('operand2', 5);
           sum.set('operation', '-');
           sum.calculateResult();
           expect(sum.get('result')).toEqual(5);
        });
        
        it('Sum calculate multiplication sums', function(){
           sum.set('operand1', 10);
           sum.set('operand2', 5);
           sum.set('operation', '*');
           sum.calculateResult();
           expect(sum.get('result')).toEqual(50);
        });
        
        it('Sum calculate division sums', function(){
           sum.set('operand1', 10);
           sum.set('operand2', 5);
           sum.set('operation', '/');
           sum.calculateResult();
           expect(sum.get('result')).toEqual(2);
        });

    });
});