/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 */
;
Template.screens.levelSelection = (function () {



    return {

        init: function (game) {

            this.page = 1;
            this.level = 0;

            this.state = null;
            this.ROWS = 4;
            this.COLUMNS = 6;
            this.game = game;
            this.screenVisible = false;


            return this;

        },



        create: function () {


            //used to communicate with MainMenu
            this.state = this.game.state.getCurrentState();

          
            var entity=Template.helpers.entity.get();
            this.background = entity.create(0, 0,'background_1');
            this.background.label='.BG';
           
            this.background.visible = false;
            
            this.buttons = this.game.add.group();
            this.firstButton = null ;

            entity.setDefault();
            entity.animation = false;
            entity.hover = false;
            entity.group = this.buttons;

            var button;
            var width = 105;
            var height= 106;

            if (Template.RATIO.x != 1){ 
                
                height = 130
                width = 125;
            }

            for (var i = 0; i < 24; i++) {

                button = entity.create(0, 0,'level_button',function(){})
                if(i==0){
                    button.label='levelSelection.levelButton.LEADER';
                    Template.ALIGN.force(button);
                    this.firstButton=button;

                }else{
                    button.label='.X';
                }
                button.kill();     
                button.width = width;
                button.height = height;


            }

            this.setUpSwipe();

            return this;

        },



        setUpSwipe: function () {

            if (!Template.MOBILE) return

            this.game.input.onDown.add(function (pointer) {
                if (!this.screenVisible) return;


                this.startingPointerLocation = {
                    x: pointer.x,
                    y: pointer.y


                }


            }, this)



            this.game.input.onUp.add(function (pointer) {
                if (!this.screenVisible) return;



                if (this.startingPointerLocation.x > pointer.x) {
                    if (this.startingPointerLocation.x - pointer.x > 200) {

                        this.nextPage();


                    }

                } else if (this.startingPointerLocation.x < pointer.x) {
                    if (pointer.x - this.startingPointerLocation.x > 200) {

                        this.previousPage();

                    }


                }

            }, this)






        },



        hide: function () {

            this.background.visible = false;
            this.back_button.visible = false;
            this.killButtons();
            
            this.screenVisible = false;
            this.page = 1;
            this.level = 0;

        },

        show: function () {

            this.screenVisible = true;
            var button, text, string, e, storageData;
            var nextPageButton, previousPageButton, recordText, recordValueText, recordData;




            this.state.menuGroup.setAll('visible', false);
            this.background.visible = true;
            var entity = Template.helpers.entity.get();

            entity.overrideState = this;
            entity.group = this.buttons;
            this.back_button = entity.create(this.game.width - 275 , this.game.height - 110 , null,Template.screens.manager.hide.bind(this,'levelSelection'), 'Menu', 80, 10, 50).setLabel('levelSelection.menuButton')

            entity.setDefault();



            for (var y = 1; y <= this.ROWS; y++) {
                for (var x = 1; x <= this.COLUMNS; x++) {
                    this.level++;

                    if (this.level > Template.LEVELS) {

                        break;
                    }
                    button = this.buttons.getFirstDead();
                    button.children = [];
                    button.revive();
                    button.events.onInputUp.removeAll();
                    button.events.onInputDown.removeAll();
                    button.events.onInputOut.removeAll();
                    button.events.onInputOver.removeAll();

                    var xPos = 150;
                    var yPos = 50;
                    var xDist = 110;
                    var yDist = 110;

                if(Template.RATIO.x!=1){
                    xPos = 123;
                    yPos = 80; 
                    xDist = 130;
                    yDist = 132;

                }
                    if (this.level > parseInt(Template.CURRENT_LEVEL) + 1) {

                        button.reset(xPos  + (xDist * (x - 1)) , (yPos + (yDist * (y - 1))) );

                        button.frameName = 'level_locked.png';

                        entity.setSound(button, 'incorrect_answer')



                        //
                    } else { //else add the level number and create the input handlers

                        button.level = this.level;

                        button.reset(xPos  + (xDist * (x - 1)) , (yPos + (yDist * (y - 1))) );

                        button.events.onInputUp.add(function (q) {
                            this.startLevel.apply(this, [q]);
                        }, this)
                        button.frameName = 'level_button.png';




                        //aling the level number based on how many numbers are needed

                        string = this.level.toString();


                        if (string.length > 1) {
                            e = string.length;
                        } else {
                            e = 0;
                        }

                        var textSize = 32;
                        var textDist = 10;
                        if(Template.RATIO.x!=1)textDist=20;

                        for (var i = 0; i < string.length; i++) {

                            text = this.game.add.bitmapText((button.width / 2 - 10) + (16 * i) - (5 * e - 1), button.height / 2 - 30, 'font', string[i], textSize - (e * 3));


                            button.addChild(text);
                        }

                        entity.setSound(button)


                    }
                    button.alive = true;



                    entity.animate(button);
                    this.buttons.add(button);



                }
            }

            this.gotNextPage = false;
            this.gotPreviousPage = false;


            entity.overrideState = this;
            entity.group = this.buttons;
            
            var arrowX,arrowY;

            //create next/previous page buttons
            if (this.level < Template.LEVELS) {

                this.gotNextPage = true;

                if(Template.RATIO.x===1){

                    arrowX = 820;
                    arrowY = 229;
                }else{

                    
                    arrowX = 920;
                    arrowY = 229;
                }


                if (!Template.CONFIG.MOBILE) {

                    entity.create(arrowX,arrowY,'arrow_right',this.nextPage).setLabel('levels.nextPage');

                } else {
                    nextPageButton = entity.create(arrowX,arrowY,'arrow_right',this.nextPage).setLabel('levels.nextPage');
                    var hitArea = entity.create(-10,0,'level_button',function(){});
                   
                    hitArea.width = nextPageButton.width;
                    hitArea.height = nextPageButton.height*4;
                    hitArea.y = -(hitArea.height / 2);
                    hitArea.alpha = 0;

                    nextPageButton.addChild(hitArea);
                }


            }

            if (this.page > 1) {

                this.gotPreviousPage = true;

                   if(Template.RATIO.x===1){
                        arrowX = 50;
                        arrowY = 229;
                    }else{
                        arrowX = 20;
                        arrowY = 229;
                }


                if (!Template.CONFIG.MOBILE) {

                     entity.create(arrowX,arrowY,'arrow_right',this.previousPage).setLabel('level.previousPage');
               
                } else {

                    previousPageButton = entity.create(arrowX,arrowY,'arrow_left',this.previousPage).setLabel('levels.previousPage');
                   
                    var hitArea = entity.create(10,0,'level_button',function(){});
                    hitArea.width = previousPageButton.width;
                    hitArea.height = previousPageButton.height*4;
                    hitArea.y = -(hitArea.height / 2);
                    hitArea.alpha = 0;
                    previousPageButton.addChild(hitArea);

                }



            }


            entity.setDefault();

        },


        nextPage: function () {

            if (!this.gotNextPage) return;

            this.page++;
            this.killButtons();
            this.show();
        },


        previousPage: function () {

            if (!this.gotPreviousPage) return;
            
            var total = this.ROWS * this.COLUMNS;
            this.page--;
            this.level = (total * this.page) - total;
            this.killButtons();
            this.show();
        },


        killButtons: function () {

            this.buttons.forEach(function (self) {


                self.kill();
            }, this)

        },


        startLevel: function (button) {
            if (Template.MOBILE) {
                if (Math.abs(this.startingPointerLocation.x - this.game.input.activePointer.x) > 50) return;

            }



            Template.selectedLevel = parseInt(button.level);

            this.game.state.start('Game');
        },


        locked: function () {

            //placeholder for locked sound

        },







        //called from MainMenu state

        shutdown: function () {
            this.buttons.destroy(true)
            this.buttons = null;
            this.background.destroy(true)
            this.background = null;
            this.back_button.destroy(true);
            this.back_button = null;
            this.level = 0;


        },

    };
})();
