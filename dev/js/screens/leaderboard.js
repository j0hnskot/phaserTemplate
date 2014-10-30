/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 * @date       30/10/2014
 * @version    0.0.1
 */
;Template.screens.leaderboard = (function () {



return {

    init:function(game){
    
    
    this.state =null;
    this.game = game;
    this.screenVisible = false;
   
    
    return this;
        
    },

    create: function () {

        this.state = this.game.state.getCurrentState();
        this.leaderboardGroup = this.game.add.group();

        var entity = Template.helpers.entity.get();
        entity.group = this.leaderboardGroup;

        entity.create(0, 0, 'help_screen').label='.BG';     

        entity.scale = 0.8;

        entity.create(100,100,entity.buttonTexture(), Template.screens.manager.hide.bind(this,'leaderboard'), 'Menu', 80, 10, 50).label='leaderboard.button';

        if(Template.CONFIG.MOBILE){
            this.createMobile();
            return this;
        }

        var request = Template.serverComm.getLeaderboard();
        var results = JSON.parse(request);


        var circle;
        for (var i = 1; i < 5; i++) {

            var name = this.game.add.bitmapText(70, 230 + (70 * (i - 1)), 'font', results['player_' + i].name, 30);
            name.label='leaderboard.name.'+i;


            var score = this.game.add.bitmapText(330 + 240, 230 + (70 * (i - 1)), 'font', results['player_' + i].score, 30);
            score.label='leaderboard.score.'+i;

            this.leaderboardGroup.add(name);
            this.leaderboardGroup.add(score);



        }

        this.hide();
        
        
        return this;

    },



    createMobile: function () {


        //holds the moving parts of the screen
        this.leaderBoardText = this.game.add.group();

        this.rect = new Phaser.Rectangle(0, 0, 0, 0);
        this.visibilityRect = new Phaser.Rectangle(0, 0, 0, 0);

        var entity = Template.helpers.entity.get();
        entity.group = this.leaderboardGroup;

        this.overlay = entity.create(100,100,'overlay').setLabel('score.overlay');

        Template.ALIGN.force(this.overlay);

        this.rect.x = 80 * Template.RATIO.x ;
        this.rect.y = 50 * Template.RATIO.y;
        this.rect.width = 760 * Template.RATIO.x ;
        this.rect.height = 500 * Template.RATIO.y;

        this.visibilityRect.x = this.overlay.x;
        this.visibilityRect.y = this.overlay.y;
        this.visibilityRect.width = this.overlay.width;
        this.visibilityRect.height = this.overlay.height;



        entity.overrideState=this;
        entity.scale=0.8;
        entity.create(850,200,'arrow_up',function () {
            this.clickingArrow = true;
            this.checkScroll(true);
        }).label='score.arrow_up';

    
         entity.create(850,200,'arrow_down',function () {
            this.clickingArrow = true;
            this.checkScroll(false, true);
        }).label='score.arrow_down';

       
         this.startingPointerLocation = {
                    x: 0,
                    y: 0
                };


        var levelData;

        var header = this.game.add.bitmapText(130 , 170 , 'font', 'Level   Accuracy     Score     Speed     Stars', 30);
        header.label='leaderboard.header';
        this.leaderboardGroup.add(header);


        if (!localStorage.getItem('Template.levelData')) {


            console.log('no data')
            var noDataText = this.game.add.bitmapText(this.overlay.x+50,this.overlay.y+50, 'font', " No records yet! \n\n Go play some levels and return back later!",30);
            noDataText.align='center';
            noDataText.label='score.noDataText';
            this.leaderboardGroup.add(noDataText);

            this.gotData=false;

        }else{

            this.gotData=true;

            levelData = JSON.parse(localStorage.getItem('Template.levelData'));

            var levelText;
            var accuracyText;
            var scoreText;
            var speedText

            
            for (level in levelData) {


                levelText = this.game.add.bitmapText(this.overlay.x+30 - (7 * (level.length - 1)), this.overlay.y + (this.overlay.height/5 * (level - 1)), 'font', level,30)
                levelText.label='X';
             
                accuracyText = this.game.add.bitmapText(
                    150 + (7 * (level.length - 1)) - (7 * (levelData[level].accuracy + '%').length), 0,
                    'font', levelData[level].accuracy + '%', 30);

                levelText.addChild(accuracyText);

                scoreText = this.game.add.bitmapText(310 + (7 * (level.length - 1)) - levelData[level].score.toString().length, 0, 'font', levelData[level].score.toString(), 30);

                levelText.addChild(scoreText);

                if(levelData[level].speed===null)levelData[level].speed=0;
               
                speedText = this.game.add.bitmapText(460 + (7 * (level.length - 1)) - (8*levelData[level].speed.toString().length), 0, 'font', levelData[level].speed.toString(),30);

                levelText.addChild(speedText);

                levelText.startX = levelText.x;
                levelText.startY = levelText.y;
                this.leaderBoardText.add(levelText)



                for (var i = 0; i < 3; i++) {
                    if (i > levelData[level].stars - 1) {
                        icon = 'placeholder.png';

                    } else {
                        icon = 'star.png';
                    }
                    var star = this.game.add.sprite(570 + (7 * (level.length - 1)) + (30 * i), 0, 'q', icon);
                    star.scale.setTo(0.5);
                    levelText.addChild(star)

                }



            }


            this.game.input.onDown.add(function (pointer) {
                if (!this.rect.contains(pointer.x, pointer.y)) return
                this.startingPointerLocation = {
                    x: pointer.x,
                    y: pointer.y


                }
                this.swipe = true


            }, this)



            this.game.input.onUp.add(function (pointer) {
                this.clickingArrow = false;
                this.swipe = false;

            }, this)





        } 



        this.hide();
     
    },

    update: function () {

        if (!Template.CONFIG.MOBILE)return;
        if (this.screenVisible) {
            if (this.swipe) this.checkScroll();
        }


    },


    checkScroll: function (buttonUp, buttonDown) {

        if(!this.gotData)return;
        this.game.tweens.removeAll();

        if (this.game.input.activePointer.y > this.startingPointerLocation.y && !buttonDown || buttonUp ) {


            if (this.leaderBoardText.getBottom().y >= this.overlay.y ) {

                return;
            };


            this.leaderBoardText.setAll('y', this.overlay.height/5, false, false, 1)

            this.startingPointerLocation.y = this.game.input.activePointer.y

        } else if (this.game.input.activePointer.y < this.startingPointerLocation.y && !buttonDown || buttonDown) {

            if (this.leaderBoardText.getTop().y <this.overlay.y+this.overlay.height-1 )   return;

            this.leaderBoardText.setAll('y', -(this.overlay.height/5), false, false, 1)
            this.startingPointerLocation.y = this.game.input.activePointer.y


        }


        this.checkVisibility();





    },


    checkVisibility: function () {



        this.leaderBoardText.forEach(function (text) {

            if(this.visibilityRect.contains(text.x,text.y+text.height) && this.visibilityRect.contains(text.x,text.y+1)){
                text.visible=true;

            }else{
                text.visible=false;



            }

        }, this);

    },


    show: function(){

        this.screenVisible = true;
        this.leaderboardGroup.setAll('visible', true);

        if(Template.CONFIG.MOBILE){
            
             this.leaderBoardText.setAll('visible', true);

             this.checkVisibility();
        }
    },

    hide: function(){

        this.screenVisible = false;
        this.leaderboardGroup.setAll('visible', false);

        if(Template.CONFIG.MOBILE){
        
            this.leaderBoardText.setAll('visible', false);
        
            this.leaderBoardText.forEach(function (text) {
                                
                text.x = text.startX;
                text.y = text.startY;    
            }, this);
        }
    }


}; })();
