/**
 * @author     John Skotiniotis <j0hnskot@gmail.com>
 */
;Template.screens.manager = (function () {

    var SCREENS=['help','options','leaderboard','gameover','hud','levelSelection','levelComplete'];



return{



    init: function (game) {this.game = game;},


    show: function(screen){

        if(SCREENS.indexOf(screen)===-1){
            console.log('Wrong Screen name');
            return;
        }

        var state=this.game.state.getCurrentState();

        state.hide();
        Template.screens[screen].show();

        if(typeof state.hud!=='undefined')state.hud.toggle();

    },

    hide: function(screen){
        
        if(SCREENS.indexOf(screen)===-1){
            console.log('Wrong Screen name');
            return;
        }

        var state=this.game.state.getCurrentState();
       
        state.show();
        Template.screens[screen].hide();
        
        if(typeof state.hud!=='undefined')state.hud.toggle();
       


    },


};



})();
