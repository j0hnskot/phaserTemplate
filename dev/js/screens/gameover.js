/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 * @date       28/10/2014
 */
;Template.screens.gameover = (function () {





return{



    init: function (game) {

        this.game = game;
        this.state = this.game.state.getCurrentState();

        return this;
    },



    create: function () {

        this.gameOverGroup = this.game.add.group();

        var entity = Template.helpers.entity.get();
        entity.group = this.gameOverGroup;
        
        entity.create(0, 0,'background_1').label='.BG';
       
        this.gameoverText = this.game.add.bitmapText(80 , 100 , 'font', 'Sadly, the time is up :( ', 80);
        this.gameoverText.label='gameoverText';
        this.gameOverGroup.add(this.gameoverText);

        entity.create(100,100,entity.buttonTexture(), this.state.retry, 'Retry', 80, 10, 50).label='gameover.retry';

        entity.create(100 , 100,null, this.state.goToMenu, 'Menu', 80, 10, 50).label='gameover.menu_button';

        this.hide();

        return this;

    },


    show: function(){
        this.gameOverGroup.setAll('visible', true);
    }, 

    hide: function(){
        this.gameOverGroup.setAll('visible', false);
    }, 


};})();
