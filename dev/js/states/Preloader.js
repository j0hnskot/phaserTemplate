/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 */
;Template.States.Preloader = function (game) {};

Template.States.Preloader.prototype = {

    preload: function () {



        this.splashScreen = this.add.sprite(0, 0, 'splash_screen');
        this.splashScreen.label='.BG';
       

        this.preload_background = this.add.sprite(300, this.game.height - 60, 'bar_background')
        this.preload_background.align = false;

        this.preload_background.scale.setTo(0.4);

        this.preloadBar = this.add.sprite(308, this.game.height - 52, 'preloader_bar');
        this.preloadBar.align = false;
        this.preloadBar.width = 563;

        this.preloadBar.height = this.preload_background.height + 3;


        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        Template.ASSETS.init(this.game);

        this.load.image('overlay','assets/overlay.png')

        //	Here we load the rest of the assets our game needs.

        //If any change to the images is needed, change the path to the wanted image.

        //fonts
        


        //audio


        Template.ALIGN.check()

    },

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.ready = false ;
        this.preloadBar.cropEnabled = false;



    },

    preloadAnimation: function(){

         if (this.cache.isSoundDecoded(Template.ASSETS.getDefaultSound()) && this.ready == false) {
            this.ready = true;

            this.add.tween(this.preloadBar)
            .to({
                alpha: 0
            }, 1000, null, true);

            this.add.tween(this.splashScreen)
            .to({
                alpha: 0
            }, 1000, null, true);

            this.add.tween(this.preload_background)
            .to({
                alpha: 0
            }, 1000, null, true)
                .onComplete.add(function () {

                    this.state.start('MainMenu');

                }, this);



        }


    },

    update: function () {
        this.preloadAnimation();   
    }

};
