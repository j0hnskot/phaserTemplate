/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 * @date       28/10/2014
 */
;
Template.screens.help = (function () {



    return {


        init: function (game) {

            this.game = game;

            this.state = null;

            return this;



        },

        create: function () {
            
            this.state = this.game.state.getCurrentState();

            this.helpGroup = this.game.add.group();
            
            var entity=Template.helpers.entity.get();
            entity.group=this.helpGroup;

            entity.create(0, 0,'help_screen').label='.BG';       

            entity.group = this.helpGroup;
            entity.scale = 0.8;         

            if (this.game.state.current === 'Game') {

                entity.create(100,100,entity.buttonTexture(), Template.screens.manager.hide.bind(this,'help'), 'Back', 90, 10, 50).label='game.back_button';

                entity.create(100,100,null, this.state.goToMenu, 'Menu', 80, 10, 50).label='game.menu_button';

            } else {

                entity.create(100,100,entity.buttonTexture(), Template.screens.manager.hide.bind(this,'help'), 'Menu', 80, 10, 50).label='menu.back_button';
            }

            this.helpText = this.game.add.bitmapText(80, 250, 'font', Template.CONFIG.HELP_TEXT, 30)
            this.helpText.align='center';
            this.helpText.label='help_text';

            this.helpGroup.add(this.helpText)

            this.hide();

            return this;

        },

        show: function(){

            this.helpGroup.setAll('visible', true);
        },

        hide: function(){

            this.helpGroup.setAll('visible', false);
        }


    };
})();