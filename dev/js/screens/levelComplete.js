/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 */
;Template.screens.levelComplete = (function () {



   return{

    init: function (game) {


        this.state = null;
        this.game = game;
        this.screenVisible = false;


        return this;

    },
       
    create: function () {
        this.starsRewarded = false;
        this.state = this.game.state.getCurrentState();
        this.levelCompleteGroup = this.game.add.group();


        this.congText = this.game.add.bitmapText(100, 0, 'font', 'Congratulations!\nYou finished the level!', 70);
        this.congText.align = 'center';
        this.congText.label='congText';

        this.congText2 = this.game.add.bitmapText(100 , 60 , 'font', 'Congratulations!\nYou finished the game!', 70);
        this.congText2.align = 'center';
        this.congText2.label='congText';

        this.levelCompleteGroup.add(this.congText);
        this.levelCompleteGroup.add(this.congText2);

        var entity = Template.helpers.entity.get();

        entity.group = this.levelCompleteGroup;

        this.nextLevelButton=entity.create(550 , 120 , null,this.state.startNextLevel, 'Next', 90, 10, 50).setLabel('levelComplete.nextButton');


        entity.create( 280 ,  120 ,null, this.state.goToMenu, 'Menu', 80, 10, 50).label='levelComplete.menuButton';


        this.scoreLabels = this.game.add.group();


        this.levelCompleteGroup.setAll('visible', false);

        this.starsGroup = this.game.add.group();

        return this;
    },


    update: function () {


        if (this.screenVisible) {

            if (this.starsRewarded === false) {
                this.rewardStars();

            }

            if (this.state.gameComplete === true) {
                this.levelCompleteGroup.remove(this.nextLevelButton, true);
                this.congText.visible = false;
                // this.congText2.visible = true;

            } else {
                this.congText2.visible = false;
            }


        }


    },
    rewardStars: function () {


        this.starsRewarded = true;
       
        var icon;
        var entity = Template.helpers.entity.get();
        entity.group = this.starsGroup;
        var firstStar = entity.create(350 , 200 ,'star').setLabel('levelComplete.star.LEADER');
        Template.ALIGN.force(firstStar);
        var distanceX = 100 ;

        for (var i = 1; i < 3; i++) {
            if (i > Template.SCORE.stars - 1) {
                icon = 'placeholder';

            } else {
                icon = 'star';
            }
            var star = entity.create(firstStar.x + 100 * i , firstStar.y, icon ).setLabel('.X');
           


        }

        i = 0;
        this.starsGroup.forEach(function(star){
            
             this.game.add.tween(star).from({
                x: -100 ,
                y: this.game.height,
                angle: 500
            }, 1000, null, true, 500 * i);
            i++;
        },this);

        this.rewardScore();



    },


    rewardScore: function () {

        var distanceY = 50;

        var scoreLabel = this.game.add.bitmapText(300 , 300 , 'font', '', 40);
        scoreLabel.label='levelComplete.scoreLabel.LEADER';
        scoreLabel.alpha = 0;
        Template.ALIGN.force(scoreLabel);

        var bonusLabel = this.game.add.bitmapText(scoreLabel.x , scoreLabel.y + distanceY , 'font', '', 40);
        bonusLabel.label='levelComplete.bonusLabel';
        bonusLabel.alpha = 0;
        
        var totalLabel = this.game.add.bitmapText(scoreLabel.x ,  scoreLabel.y + distanceY * 2 , 'font', '', 40);
        totalLabel.label='levelComplete.totalLabel';
        
        this.scoreLabels.add(scoreLabel);
        this.scoreLabels.add(bonusLabel);
        this.scoreLabels.add(totalLabel);
        var score = {};
        var bonus = {};
        var total = {};
        score.value = 0;
        bonus.value = 0;
        total.value = 0;

        this.game.add.tween(scoreLabel).to({
            alpha: 1
        }, 1000, null, true)
            .onComplete.add(function () {


                this.game.add.tween(score).to({
                    value: Template.SCORE.preBonusScore
                }, 1000, null, true)


                .onUpdateCallback(function () {
                    scoreLabel.text = 'Score : ' + score.value.toFixed(0);


                }, this)


            }, this);



        this.game.add.tween(bonusLabel).to({
            alpha: 1
        }, 1000, null, true, 1000)
            .onComplete.add(function () {


                this.game.add.tween(bonus).to({
                    value: Template.SCORE.tempScore - Template.SCORE.preBonusScore
                }, 1000, null, true)


                .onUpdateCallback(function () {
                    bonusLabel.text = 'Time bonus : ' + bonus.value.toFixed(0);



                }, this)


            }, this);



        this.game.add.tween(totalLabel).to({
            alpha: 1
        }, 1000, null, true, 2000)
            .onComplete.add(function () {


                this.game.add.tween(total).to({
                    value: Template.SCORE.totalScore
                }, 1000, null, true)


                .onUpdateCallback(function () {
                    totalLabel.text = 'Total score : ' + total.value.toFixed(0);


                }, this)


            }, this);






    },

    show: function(){
        this.screenVisible = true;
        this.levelCompleteGroup.setAll('visible', true);
    },
    
    hide: function(){
        this.screenVisible = false;
        this.levelCompleteGroup.setAll('visible', false);
        this.starsGroup.removeAll(true);
        this.starsRewarded = false;
        this.scoreLabels.removeAll(true);


    },




};})();