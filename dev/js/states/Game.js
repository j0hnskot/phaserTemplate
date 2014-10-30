/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 */
;Template.States.Game = function (game) {};

Template.States.Game.prototype = {

    init: function () {

        Template.SCORE.init(this.game);
        //stores the current question's index
        this.currentIndex = -1;



        //when the player clicks a trunk ,this prevents any extra clicks  for 1.5 second
        this.canClick = true;

        //this is used to store the level data the server gave
        this.level = null;

        this.levelTimer = this.time.create();

        this.score = 0;
        this.tempScore = 0;
        this.levelScore = 0;
        this.preBonusScore = 0;



        //used to calculate accuracy and score
        this.correctChoices = 0;
        this.timesClicked = 0;
        this.accuracy = 0;
        this.stars = 0;


        //Vars for state check

        this.finishedLevel = false;
        this.gameComplete = false;
        this.levelsCompleted = 0;
        this.levelCompleted = false;

        //used by handcursor method
        this.screenVisible = true;
       

        //Helpers
        this.buttonHelper = Template.helpers.button;


        //GAME SPECIFIC PROPERTIES



    },



    create: function () {



        this.background = this.add.tileSprite(0, 0, 960, 640, 'q', 'background_1.png');
        this.background.label='.BG';
        this.background.autoScroll(100,100)

        this.hud = Template.screens.hud.init(this.game).create();
        this.question = this.hud.levelText;
        this.helpScreen = Template.screens.help.create();
        this.gameOverScreen = Template.screens.gameover.init(this.game).create();
        this.levelCompleteScreen = Template.screens.levelComplete.init(this.game).create();
        
        this.loadLevel();

        Template.SCORE.set('correctAnswer').set('preBonus',100).set('correctAnswer');
        console.log(Template.SCORE.preBonusScore)

        Template.ALIGN.check();
    },


    loadLevel: function () {


        var request = Template.data.getLevel(Template.selectedLevel);
        if (request != null && (request.search('Cannot') == -1)) {

            this.randomBackground();
            this.level = JSON.parse(request);

            this.timeLimitToMS();
            Template.SCORE.scoreRanks=this.level.scoreRanks;
            this.initLevel();
            this.correctChoices = 0;
            this.timesClicked = 0;
            this.levelCompleted = false;
       
             this.levelComplete();

        } else {

            this.state.start('MainMenu');
            return
        }


    },


    update: function () {


        this.timeCheck()

        Template.helpers.handCursor.check();

        this.levelCompleteScreen.update();

    },




    timeCheck: function () {

        if (this.level !== '') {


            var timeLeft = Math.round((this.timeLimit - this.levelTimer.ms) / 1000);

            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft - (60 * minutes);

            if (seconds < 10)
                seconds = '0' + seconds;

            if (minutes < 10)
                minutes = '0' + minutes;


            if (Math.floor(this.levelTimer.ms / 1000) >= this.timeLimit / 1000 && this.levelTimer.paused !== true && !this.levelCompleted) {
                this.gameOver = true;
                this.canClick = false;
                this.levelTimer.stop()
                this.showGameOver();
            }


            if (this.levelTimer.ms / 1000 > 0) {

                if (!this.hud.timeClock) {
                    var cropRect = {
                        x: 0,
                        y: 0,
                        width: 240 - ((this.levelTimer.ms / 1000) / (this.timeLimit / 1000)) * 240,
                        height: this.hud.timeBar.height
                    };

                    this.hud.timeBar.crop(cropRect);
                } else {
                    this.hud.timeValue.text = minutes + ' : ' + seconds;
                }

            } else {
                //a fix to prevent a bug currently in phaser.
                this.levelTimer.destroy();
                this.levelTimer = this.time.create();
                this.levelTimer.start();
            }

        }




    },




    //Sends the data of the completed level to the server and proceeds to the next level
    levelComplete: function () {

        Template.SCORE.rewardStars();

        var data = {
            "userId": Template.USER_ID,
            "gameId": Template.GAME_ID,
            "accuracy": this.accuracy,
            "timeSpent": Math.round(this.levelTimer.ms / 1000),
            "levelNumber": Template.selectedLevel,
            "stars": Template.SCORE.stars,
            "totalScore": Template.SCORE.totalScore,
            "levelScore": Template.SCORE.levelScore,
            "speed": Template.SCORE.answersPerMinute
        };

        Template.data.saveLevelData(data);
        this.resetGame();
        this.levelScore = 0;


        Template.selectedLevel++;

        if (Template.CURRENT_LEVEL < Template.selectedLevel) {

            Template.CURRENT_LEVEL++;

        }

        this.levelsCompleted++;
        if (Template.selectedLevel > Template.LEVELS) {
            this.gameComplete = true;

        }

        this.showLevelComplete();

    },



    timeLimitToMS: function () {
        var minuteMS = (this.level.timeLimit.minutes * 60) * 1000;
        var secondMS = this.level.timeLimit.seconds * 1000;

        this.timeLimit = minuteMS + secondMS;

        this.levelTimer.stop();
        this.levelTimer.start();

    },

   

    randomBackground: function () {

        var rand = this.game.rnd.integerInRange(1, this.NUMBER_OF_BACKGROUNDS);
        Template.ASSETS.set(this.background,"background_" + rand);


    },

    startNextLevel: function () {

        this.hideLevelComplete();
        this.tweens.removeAll();
        this.canClick = true;
        this.loadLevel();


    },

    initLevel: function () {



    },

    resetGame: function () {


        this.tweens.removeAll();
        this.canClick = true;
        this.currentIndex = -1;
        this.currentNumber = -1;
        this.currentExpr = 0;

        this.gameOver = false;

    },


    retry: function () {

        this.resetGame();
        this.hideGameOver();
        this.tempScore = this.score;
        this.levelScore = 0;
        this.hud.updateScoreText(this.tempScore);
        this.loadLevel();
        this.levelTimer.start();


    },

    goToMenu: function () {


        var data = {
            "userId": Template.USER_ID,
            "maxLevelsReached": Template.selectedLevel - 1,
            "gameId": Template.GAME_ID,

        };


        Template.data.sendGameEnd(JSON.stringify(data));


        this.state.start('MainMenu');

    },



    //Misc methods
    show: function(){
        this.unpause();
    },

    hide: function(){
        this.pause();
    },

    pause: function () {

        this.tweens.pauseAll();
        this.canClick = false;
        this.levelTimer.pause();
        this.screenVisible = false;

    },

    unpause: function () {
        this.tweens.resumeAll();
        this.canClick = true;
        this.levelTimer.resume();
        this.screenVisible = true;

    },

   

    showGameOver: function () {
        Template.screens.manager.show('gameover');
    },

    hideGameOver: function () {
        Template.screens.manager.hide('gameover');
    },

    showLevelComplete: function () {       
        Template.screens.manager.show('levelComplete');       
    },


    hideLevelComplete: function () {
        Template.screens.manager.hide('levelComplete');   
    },



    shutdown: function () {

        this.currentIndex = -1;
        this.game.sound.mute = false;

        this.canClick = true;
        this.level = '';
        this.levelLabel = '';

        this.levelTimer.destroy(true);
        this.score = 0;
        this.tempScore = 0;

    }

};