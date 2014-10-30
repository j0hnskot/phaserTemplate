/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 * @date       30/10/2014
 * @version    0.0.1
 */
;
Template.screens.options = (function () {

    return {

        init: function (game) {

            this.state = null;
            this.game = game;
            this.screenVisible = false;
            return this;

        },

        create: function () {

            this.state = this.game.state.getCurrentState();
            this.optionsGroup = this.game.add.group();
          
            var entity = Template.helpers.entity.get();;
            entity.group = this.optionsGroup

            entity.create(0,0,'options_screen').label='.BG';           

            entity.create( 275 , 120 ,'button_s', Template.screens.manager.hide.bind(this,'options'), 'Menu', 80, 10, 50).label='options.menu_button';

            this.createBars();

            this.optionsGroup.setAll('visible', false);
                   
            return this;

        },

        update: function () {
            // console.log(this.fxSlider.x)

            //set volume level and save changes to localstorage
            if(!this.screenVisible)return;
            
            if (this.fxSlider.input.isDragged || this.fxSlider.moved === true) {

                this.fxSlider.moved = false;
                var volume = (this.fxSlider.x-  this.fxSlider.initX) / (this.fxBarBounds.width - this.fxSlider.initX);
                console.log(volume)
                Template.helpers.sound.setFxVolume(volume);               

            }else if (this.musicSlider.input.isDragged || this.musicSlider.moved === true) {

                    this.musicSlider.moved = false;
                    var volume = (this.musicSlider.x-this.musicSlider.initX) / (this.musicBarBounds.width - this.musicSlider.initX);
                console.log(volume)
                
                    Template.helpers.sound.setMusicVolume(volume);
            } 


        },

        createBars:function(){

            //default position values;
            var sliderX = 26;
            var sliderY = 32;

            var entity = Template.helpers.entity.get();
            entity.group = this.optionsGroup;
            entity.overrideState = this;

            this.fxVolumeBar = entity.create(360,215,'green_bar',fxBarHandler).setLabel('fxVolumeBar');
            this.fxBarBounds = new Phaser.Rectangle(sliderX, sliderY , this.fxVolumeBar.width - sliderX, this.fxVolumeBar.height);

            this.musicVolumeBar = entity.create(380 , 295 ,'red_bar',musicBarHandler).setLabel('musicVolumeBar');
            this.musicBarBounds = new Phaser.Rectangle(sliderX, sliderY , this.musicVolumeBar.width - sliderX, this.musicVolumeBar.height);


            entity.anchor=true;
            entity.animation=false;
            entity.hover=false;

            this.fxSlider = entity.create(sliderX, sliderY,'slider',function(){});
            this.fxSlider.initX=this.fxSlider.x;
            this.fxSlider.maxX=this.fxVolumeBar.width-this.fxSlider.width;

            this.fxSlider.x = (Template.helpers.sound.fxVolume * (this.fxBarBounds.width - this.fxSlider.initX)) + this.fxSlider.initX;

            this.fxSlider.input.enableDrag(false,true,false,255,this.fxBarBounds);
            this.fxSlider.input.priorityID=1;
            this.fxSlider.input.allowVerticalDrag = false;

            this.fxVolumeBar.addChild(this.fxSlider);
            
            this.musicSlider = entity.create(sliderX, sliderY,'slider',function(){});
            this.musicSlider.initX=this.musicSlider.x;
            this.musicSlider.maxX=this.musicVolumeBar.width-this.musicSlider.width;

            this.musicSlider.x = (Template.helpers.sound.musicVolume * (this.musicBarBounds.width - this.musicSlider.initX)) + this.musicSlider.initX;

            this.musicSlider.input.enableDrag(false,true,false,255,this.musicBarBounds);
            this.musicSlider.input.priorityID=1;
            this.musicSlider.input.allowVerticalDrag = false;

            this.musicVolumeBar.addChild(this.musicSlider);

             function fxBarHandler () {

                if(this.game.input.x<=(this.fxVolumeBar.x+ (this.fxSlider.width * 1.5))){
                    this.fxSlider.x = this.fxSlider.initX;    

                }else if(this.game.input.x>=(this.fxVolumeBar.x+this.fxVolumeBar.width- (this.fxSlider.width * 1.5))){

                  this.fxSlider.x = this.fxSlider.maxX;  
                }else{

                    this.fxSlider.x = this.game.input.x - this.fxVolumeBar.x;
                }

                this.fxSlider.moved = true;
            };

            function musicBarHandler() {

                 if(this.game.input.x<=(this.musicVolumeBar.x+ (this.musicSlider.width * 1.5))){
                    console.log('left')
                    this.musicSlider.x = this.musicSlider.initX;    

                }else if(this.game.input.x>=(this.musicVolumeBar.x+this.musicVolumeBar.width- (this.musicSlider.width * 1.5))){
                    console.log('right')

                  this.musicSlider.x = this.musicSlider.maxX;  
                }else{

                    this.musicSlider.x = this.game.input.x - this.musicVolumeBar.x;
                }

                this.musicSlider.moved = true;               
            };



        },

        show: function(){
            this.optionsGroup.setAll('visible', true);
            this.screenVisible = true;
        },

        hide: function(){
            this.optionsGroup.setAll('visible', false);
            this.screenVisible = false;
        },

        shutdown: function () {

        },

    };})();