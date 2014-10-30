 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;Template.States.MainMenu = function (game) {

};

Template.States.MainMenu.prototype = {

  

    create: function () {

        if(Template.CONFIG.EDITOR)Template.helpers.editor.init(this.game)


        Template.data.getPlayerData();
       
        Template.helpers.sound.start();

        // var music = this.game.add.audioSprite('fxSounds');
        // music.play('incorrectSound')
        // console.log(music.markers)
        this.menuGroup = this.game.add.group();

        var entity = Template.helpers.entity.get();
        entity.group=this.menuGroup;


        entity.create(0,0,'title_screen').label='.BG';

        //create each menu button and add it to the menuGroup
        entity.create(100,100,'button_l', Template.screens.manager.show.bind(this,'levelSelection'), 'Start', 115, 20, 80).label='menu.play_button';

        entity.create(100,100,entity.buttonTexture(), Template.screens.manager.show.bind(this,'options'), 'Options', 70, 10, 50).label='menu.options_button';

        entity.create(100,100,null, Template.screens.manager.show.bind(this,'leaderboard'), 'Scores', 80, 10, 50).label='menu.score_button';

        entity.create(100,100, null,Template.screens.manager.show.bind(this,'help'), 'Help', 90, 10, 50).label='menu.help_button';

    
    if (Template.CONFIG.MOBILE) {

            if (Template.CONFIG.OS() == 'android') {

                entity.scale=0.8;
                entity.create(100,100,null, this.exit, 'Exit', 70, 10, 50).label='menu.exit_button';
            };


            if (Template.CONFIG.LITE === true) {

                entity.scale=0.8;
                entity.create(100,100,null, this.openFullLink, 'Buy\nFull version', 70, 10, 50).label='menu.buy_button';
            };


        };



        this.options=Template.screens.options.init(this.game).create();
        this.help=Template.screens.help.init(this.game).create();
        this.leaderboard=Template.screens.leaderboard.init(this.game).create();
        this.levels=Template.screens.levelSelection.init(this.game).create();

        Template.ALIGN.check();
       


    },



    update: function () {
        this.options.update();
        this.leaderboard.update();
        Template.helpers.handCursor.check();
    },


    hide: function(){     
       this.menuGroup.setAll('visible', false);
    },

    show: function(){
       this.menuGroup.setAll('visible', true);
    },

    


    exit: function () {
        CocoonJS.App.forceToFinish();
    },


    render: function () {
        // this.game.debug.geom(this.options.fxBarBounds);
        // this.game.debug.geom(this.options.musicBarBounds)


    },

};
