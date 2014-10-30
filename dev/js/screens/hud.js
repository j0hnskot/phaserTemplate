/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 * @date       28/10/2014
 */
;
Template.screens.hud = (function () {



        return {

            init: function (game) {            

                this.state = game.state.getCurrentState();
                this.game = game;
              
                return this;

            },


            create: function (timeClock) {

                this.timeClock = timeClock;

                this.hudGroup = this.game.add.group();

                var entity = Template.helpers.entity.get();
                entity.group = this.hudGroup;

                if (!this.timeClock) {
                    this.timeBar = entity.create(350 , 10, 'preloader_bar').setLabel('timeBar');
                } else {
                    this.timeValue = this.game.add.bitmapText(85 , 50, 'font', '', 20);
                    this.timeValue.label='timeValue';
                    this.hudGroup.add(this.timeValue);
                }


                this.scoreImage = entity.create(0, 10,'bg_transparent').setLabel('scoreImage');
               
                this.scoreText = this.game.add.bitmapText(this.scoreImage.width / 2 + 10 , this.scoreImage.height / 2 - 30, 'font', 'Score : 0', 25);
                this.scoreText.label='scoreText';
                this.scoreImage.addChild(this.scoreText);

                this.levelImage = entity.create(350 , 90,'bg_transparent').setLabel('levelImage');
                this.levelText = this.game.add.bitmapText(10, 10, 'font', '', 30);
                this.levelText.label='levelText';
                this.levelImage.addChild(this.levelText);              

                entity.create(80 , 10,'options', Template.screens.manager.show.bind(this,'help')).label='helpImage';

                entity.overrideState = Template.helpers.sound;
                this.musicImage = entity.create(160 , 10, 'music',Template.helpers.sound.musicControl).setLabel('musicImage');

                
                return this;

            },


            updateScoreText: function (score) {
               this.scoreText.text = 'Score : ' + score;
            },

            toggle:function(){
            
                this.hudGroup.visible = !this.hudGroup.visible;
                console.log("HUD Visible: "+this.hudGroup.visible);            
            },

            shutdown: function () {
                this.hudGroup.destroy(true);
            },

        };})();