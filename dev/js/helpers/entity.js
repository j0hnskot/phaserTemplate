 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        24/10/2014
 */


;Template.helpers.entity = (function () {



return {



    init: function (game) {

        this.game = game;

        this.sound = {
            audio: '',
            marker: 'button_click'
        };

        this.group = this.game.world;
  
        this.anchor = false;

        this.DEFAULT_BUTTON_TEXTURE = 'button_s';

        this.anchorValue = 0.5;

        this.usingAtlas = true;

        this.atlas = 'q';

        this.texture = null;

        this.animation = true;
        
        //this.handCursor=(Phaser.VERSION.indexOf('2.1')!=-1)?!this.game.device.cocoonJS:false;

        this.hover = true;

        this.soundEnabled = true;

        this.scale = 1;

        this.useTextTint = false;

        this.tintValue = 22784;
	
	    this.font = 'font';

        this.maxFontSize = 60;

        this.overrideState = null

        return this;


    },

    create: function (x, y,texture, func, text, tx, ty, forcedSize) {
       
        if(!!texture===true)this.texture = texture;
        if(this.texture===null)this.texture = this.DEFAULT_BUTTON_TEXTURE;
         this.checkAtlas();

        this.state = this.overrideState || this.game.state.getCurrentState();

        var entity;

        var type=(!!func===true)?'button':'sprite';


        if(type=='sprite'){

             entity = this.game.add.sprite(x, y, this.atlas);

        }else{

            entity = this.game.add.button(x, y, this.atlas, func, this.state);

        }

        Template.ASSETS.set(entity,this.texture)
          

        entity.scale.setTo(this.scale);

        //a small movement to make the buttons look better when clicked
        if(type=='button'){

            this.animate(entity);
            if (this.soundEnabled) this.setSound(entity);
      
        }

        if (this.anchor) entity.anchor.setTo(this.anchorValue);

        entity.alive = true;

        
        //if(this.handCursor) this.setHandCursor(button);

        
        this.group.add(entity)

        if (text !== undefined) this.setText(entity, text, tx, ty, forcedSize);

        entity.setLabel=function(label){this.label=label;return this;};

        return entity

    },
    
    
    setHandCursor:function(entity){

            entity.input.useHandCursor=true;
        
            entity.events.onInputUp.add(function () {
                this.game.input.activePointer.dirty=true;
                entity.events.onInputOut.dispatch(entity);
                     console.log(this.game.input.activePointer)
                  this.game.canvas.style.cursor = "default";
             
        }, this);
    
    
    },


    setText: function (entity, text, tx, ty, forcedSize) {

        var bmtext = this.game.add.bitmapText(0, ty, this.font, text, this.maxFontSize);

        bmtext.align='center';

        if (this.useTextTint) bmtext.tint = this.tintValue;

        entity.addChild(bmtext);

        if (forcedSize !== undefined) {
            bmtext.fontSize = forcedSize;
            bmtext.updateText();


        } else {
            while (bmtext.width >= entity.width - entity.width / 2) {
                bmtext.fontSize -= 1;
                bmtext.y += 0.8;

                bmtext.updateText();

            }


        }

        bmtext.x = tx - text.length * 5;





    },

    setSound: function (entity, marker) {

        entity.events.onInputDown.add(function () {

            Template.helpers.sound.play(marker || this.sound.marker)

            // this.sound.audio.play();

        }, this);


    },

    checkAtlas: function () {

        (this.texture.toString().indexOf('.') == -1)?this.usingAtlas = false:this.usingAtlas = true;
     

    },


    setTexture: function () {


        if (this.texture.constructor.toString().indexOf("Array") == -1) {


            return this.texture;

        } else {


            var random = this.game.rnd.integerInRange(0, this.texture.length - 1);

            return this.texture[random];


        }



    },

    animate: function (entity) {

       
        entity.startX = entity.x;
        entity.startY = entity.y;
        entity.startWidth = entity.width;
        entity.startHeight = entity.height;

        if (this.animation) {
            entity.events.onInputDown.add(function (self) {

                if(Template.CONFIG.EDITOR.IS_ON())return;

                self.y += 2;
                self.x -= 4;
                self.width += 10;
            });

            entity.events.onInputUp.add(function (self) {

                if(Template.CONFIG.EDITOR.IS_ON())return;


                self.x = self.startX;
                self.y = self.startY;
                self.width = self.startWidth;


            });
        }

        if (this.hover && !this.game.device.cocoonJS) {
            entity.events.onInputOver.add(function (self) {

                if(Template.CONFIG.EDITOR.IS_ON())return;

                self.y += 2;
                self.x -= 4;
                self.width += 5;




            })

            entity.events.onInputOut.add(function (self) {

                if(Template.CONFIG.EDITOR.IS_ON())return;

                self.x = self.startX;
                self.y = self.startY;
                self.width = self.startWidth;

            })
        }

    },





    setDefault: function () {

        this.texture = null;
        this.animation = true;
        this.hover = true;
        this.usingAtlas = true;
        this.anchor = false;
        this.anchorValue = 0.5;
        this.soundEnabled = true;
        this.scale = 1;
        this.useTextTint = false;
        this.font = 'font';
        this.overrideState = null;
        this.group=this.game.world;
        this.handCursor=(Phaser.VERSION.indexOf('2.1')!=-1)?!this.game.device.cocoonJS:false;

       

    },


    get: function(){

        this.setDefault();
        return this;


    },


    buttonTexture: function(){
        return this.DEFAULT_BUTTON_TEXTURE;
    },



} })();
