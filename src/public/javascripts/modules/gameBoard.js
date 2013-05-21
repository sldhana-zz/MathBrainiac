define([
    'app',
    'constants',
    'modules/sum',
    'modules/gameTimer',
    'modules/settings',
    'modules/header',
    'modules/utility'
    ], function(App, Constants, Sum, GameTimer, Settings, Header, Utility){
        var GameBoard = App.module();

        GameBoard.Model = Backbone.Model.extend({
            defaults:{
                currentSumIndex: 0,
                currentModel: null,
                totalSums: 0
            },

            initialize: function(){
                this.errorCount  = 0;
                this.set('totalSums', this.get('collection').length);
                this.set('currentModel', this.get('collection')[this.get('currentSumIndex')]);

                this.layout = App.useLayout('gameBoard/layout').setViews({
                    '#keyboard': new GameBoard.Views.Keyboard(),
                    '#expression': new Sum.View({
                        model: this.get('currentModel')
                    })
                });
                this.layout.on('afterRender', function() {
                    //focus on answer textbox
                    $('#answer').focus();
                });
                this.layout.render();



                this.gameTimer = new GameTimer.Model();
                this.gameTimer.start();


                this.initEvents();
            },

            initEvents: function(){
                var self = this;
                this.listenTo(App, 'GameBoard:verifyAnswer', function(opt){
                    var answer = self.get('currentModel').get('result').toString();
                    var modAnswer = parseInt(opt.answer, 10);
                    if(modAnswer === parseInt(answer, 10)){
                        App.trigger('GameBoard:correctAnswer');
                        self.getNextExpression();
                    }
                    else{
                        var chars = opt.answer.split('');
                        if(chars.length >= 2){
                            for(var i = 0; i < chars.length; i++){
                                if(chars[i] !== answer[i]){
                                    App.trigger('GameBoard:incorrectAnswer');
                                    self.errorCount++;
                                    break;
                                }
                            }
                        }
                    }
                });

                this.listenTo(this, 'change:currentSumIndex', function(){
                    this.set('currentModel', this.get('collection')[this.get('currentSumIndex')]);
                    this.showExpression();
                });


            },

            cleanupEvents: function(){
                this.stopListening();
            },

            getNextExpression: function(){
                var currentIndex = this.get('currentSumIndex');
                var total = this.get('totalSums');
                if(currentIndex < total - 1){
                    this.set('currentSumIndex', parseInt(currentIndex, 10) + 1);
                    return;
                }
                this.gameOver();
            },

            showExpression: function(){
                this.set('currentModel', this.get('collection')[this.get('currentSumIndex')]);

                var sumView = new Sum.View({
                    model: this.get('currentModel')
                });

                this.layout.setView('#expression', sumView).render();
            },

            gameOver: function(){
                this.gameTimer.finish();
                var settings = new Settings.Model({
                    id: 1,
                    name: Constants.getConstant('storage').NAME
                });
                settings.fetch();

                settings.calculateRank(this.get('gameType').type, this.gameTimer.getTotalTime(), this.errorCount);
                App.router.go('game', this.get('gameType').type, 'complete' );

            }
        });

        GameBoard.Views.Keyboard = Backbone.View.extend({
            template: 'gameBoard/keyboard',
            clearPressed: false,

            events: {
                'keyup #answer': 'verifyAnswer',
                'click #clear': 'clearAnswer',
                'click button': 'placeAnswer'
            },

            initialize: function(){
                this.setupGameEvents();

            },

            setupGameEvents: function(){
                var self = this;
                App.on('GameBoard:correctAnswer', function(){
                    self.clearAnswer();
                });

                App.on('GameBoard:incorrectAnswer', function(){
                    self.clearAnswer();
                });
            },

            verifyAnswer: function(event){
                var target = $(event.target);
                this.validate($(target).val());
            },

            validate: function(val){
                App.trigger('GameBoard:verifyAnswer', {
                    answer: val
                });
            },

            clearAnswer: function(event){
                $('#answer').val('');
                this.clearPressed = true;
            },

            placeAnswer: function(event){
                if(!this.clearPressed){
                    var target = $(event.target);
                    var id = $(target).data('id');
                    var existingVal = $('#answer').val();
                    var newAnswer = existingVal + id;
                    $('#answer').val(newAnswer);
                    this.validate(newAnswer);
                }
                this.clearPressed = false;
            }
        });

        return GameBoard;
    });