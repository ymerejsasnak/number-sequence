'use strict';

$(function() {

    const LEVELS = 10;

    const elements = {
                        level:    $('#question-div h2 span'),
                        correct:  $('#question-div p span'),
                        sequence: $('#sequence-div p'),
                        answer1:  $('#answer1'),
                        answer2:  $('#answer2'),
                        answer3:  $('#answer3'),
                        answer4:  $('#answer4')
                    };


    function Game() {
        this.level = 0;
        this.question = null;
        this.correct = 0;
    }

    Game.prototype.runLevel = function() {
        this.level++;
        this.question = new Question(this.level);
        this.display();
    }

    Game.prototype.display = function() {
        elements.level.text(this.level);
        elements.correct.text(this.correct);
        elements.sequence.text(this.question.given.join(' - '));
        elements.answer1.text(this.question.options[0]);
        elements.answer2.text(this.question.options[1]);
        elements.answer3.text(this.question.options[2]);
        elements.answer4.text(this.question.options[3]);
    }

    Game.prototype.checkAnswer = function(choice) {
        if (choice === this.question.answer) {
            console.log('yes');
            this.correct++;
        }
    }



    function Question(level) {
        //create new sequence and do generation/transformation based on level
        let seqObj = new Sequence;

        seqObj.generate(level, 'add');

        
        //set values for question object
        this.sequence = seqObj.show();
        this.given = this.sequence.slice(0,10);
        this.options = this.sequence.slice(10,14);
        this.answer = this.sequence[10].toString();

    }



    let game = new Game;
    game.runLevel();


    $('button').on('click', function() {
        game.checkAnswer($(this).text());
        if (game.level <= LEVELS) {
            game.runLevel();
        }
    });





});