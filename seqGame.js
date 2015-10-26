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
        let seqObj = new Sequence, seqObj2 = new Sequence;

        switch (level) {
            case 1:
                this.sequence = seqObj.generate(Math.floor(Math.random() * 30 + 1), 'add');
                break;

            case 2:
                seqObj.generate(Math.floor(Math.random() * 50 + 1), 'add');
                seqObj2.generate(Math.floor(Math.random() * 50 + 1), 'add');
                this.sequence = seqObj.alternate(seqObj2);
                break;

            case 3:
                seqObj.generate(Math.floor(Math.random() * 20 + 5), 'multiply');
                this.sequence = seqObj.transform(Math.floor(Math.random() * 100) + 20, 'add');
                break;

            case 4:
                seqObj.generate(Math.floor(Math.random() * 100 + 25), 'multiply');
                this.sequence = seqObj.transform(Math.floor(Math.random() * 600) + 200, 'add');
                break;
                

            case 5: 
                seqObj.generate(Math.floor(Math.random() * 20 + 1), 'add');
                this.sequence = seqObj.decimalToOther(Math.floor(Math.random() * 5 + 3));
                break;               
                

            case 6:
                
                this.sequence = seqObj.generate(Math.floor(Math.random() * 3 + 2), 'power');
                this.sequence = seqObj.transform(Math.floor(Math.random() * 100) + 20, 'add');
                break;

            case 7:
                seqObj.generate(Math.floor(Math.random() * 10 + 5), 'multiply');
                seqObj2.generate(Math.floor(Math.random() * 10 + 5), 'multiply');
                this.sequence = seqObj.apply(seqObj2, 'multiply');
                break;
                
            case 8:
                seqObj.generate(Math.floor(Math.random() * 50 + 1), 'add');
                seqObj.decimalToOther(Math.floor(Math.random() * 2 + 3));
                this.sequence = seqObj.transform(Math.floor(Math.random() * 8 + 11), 'multiply');
                break;

            case 9:
                seqObj.generate(Math.floor(Math.random() * 50 + 1), 'multiply');
                seqObj2.generate(Math.floor(Math.random() * 50 + 1), 'multiply');
                seqObj.decimalToOther(Math.floor(Math.random() * 5 + 2));
                seqObj2.decimalToOther(Math.floor(Math.random() * 5 + 2));
                seqObj.transform(Math.floor(Math.random() * 600) + 200, 'add');
                seqObj2.transform(Math.floor(Math.random() * 600) + 200, 'add');
                this.sequence = seqObj.apply(seqObj2, 'add');
                break;

            case 10:
                seqObj.generate(Math.floor(Math.random() * 5 + 1), 'power');
                seqObj2.generate(Math.floor(Math.random() * 5 + 1), 'power');
                seqObj2.decimalToOther(Math.floor(Math.random() * 5 + 2));
                this.sequence = seqObj.apply(seqObj2, 'add');
                break;      
                
        }

        





        
        //use above to set values for question object
        this.given = this.sequence.slice(0,10);
        this.answer = this.sequence[10].toString();



        this.options = this.sequence.slice(10,14); //temporary, need to change answer placement and incorrect options

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