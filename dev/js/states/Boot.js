 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;var Template = {

  



    /* Your game can check Template.orientated in internal loops to know if it should pause or not */
    orientated: false,

    helpers: {},

    screens:{},

    States:{},

    selectedLevel: 1,


};

Template.States.Boot = function (game) {};

Template.States.Boot.prototype = {

    preload: function () {

        Template.init(this.game);
        Template.QUALITY.set();
       

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('splash_screen', 'assets/'+Template.QUALITY.get()+'splash_screen.png');
        this.load.image('preloader_bar', 'assets/preloader_bar.png');
        this.load.image('bar_background', 'assets/bar_background.png');
    },

    create: function () {


        this.game.state.add('Preloader', Template.States.Preloader);
        this.game.state.add('MainMenu', Template.States.MainMenu);
        this.game.state.add('Game', Template.States.Game);


        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 960;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);

        } else  {
            
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        Template.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        Template.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
