 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        24/10/2014
 */

;
Template.SCORE = (function () {

    var scoreReasons={

        'correctAnswer':10,
        'incorrectAnswer':-5,
        'timeBonus': 10

    }

    return {


        init: function (game) {

            this.game = game;
            this.state = game.state.getCurrentState();
            this.levelScore = 0;
            this.tempScore = 0;
            this.totalScore = 0;
            this.preBonusScore = 0;
            this.answersPerMinute = 0;
            this.accuracy = 0;
            this.stars = 0;
            this.scoreRanks={};

            return this;

        },

        set:function(reason,multiply){

        
            
            if(typeof scoreReasons[reason]==='undefined'){
                console.log('Wrong score reason.');
                return this;
            }

            if(reason=='timeBonus'){
                this.preBonusScore = this.tempScore;
            }

            if(!multiply)multiply=1;

            this.levelScore += scoreReasons[reason] * multiply;
            this.tempScore += scoreReasons[reason] * multiply;

            if(this.levelScore<0)this.levelScore=0;
            if(this.tempScore<0)this.tempScore=0;

            this.state.hud.updateScoreText(this.tempScore);

            return this;
        },

        save:function(){

            this.totalScore=this.tempScore;
            return this;

        },

        reset:function(){

            this.levelScore = 0;
            this.preBonusScore = 0;
            this.answersPerMinute = 0;
            this.accuracy = 0;
            this.stars = 0;
            this.scoreRanks = {};


            return this;
        },

        rewardStars: function () {

        var timeLeft = Math.round((this.state.timeLimit - this.state.levelTimer.ms) / 1000);

        this.set('timeBonus',timeLeft); 

        this.answersPerMinute = Math.round((this.state.correctChoices * 60) / (this.state.timeLimit / 1000 - timeLeft));
        console.log(this.answersPerMinute)
        this.accuracy = ((this.state.correctChoices / this.state.timesClicked) * 100).toFixed(2);

        if (this.accuracy >= parseInt(this.scoreRanks['3'].accuracy) && timeLeft >= parseInt(this.scoreRanks['3'].timeLeft)) {

            this.stars = 3;

        } else if (this.accuracy >= parseInt(this.scoreRanks['2'].accuracy) && timeLeft >= parseInt(this.scoreRanks['2'].timeLeft)) {

            this.stars = 2;

        } else {

            this.stars = 1;

        }

        this.save();

    },







    };
})();
