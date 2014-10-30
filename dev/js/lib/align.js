 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        22/10/2014
 */

;

Template.ALIGN = (function () {


	var positions={
 "menu.help_button": {
  "x": 80,
  "y": 278,
  "width": 260,
  "height": 104
 },
 "menu.score_button": {
  "x": 619.027774810791,
  "y": 446.0138854980469,
  "width": 260,
  "height": 104
 },
 "menu.options_button": {
  "x": 600,
  "y": 98,
  "width": 220,
  "height": 104
 },
 "menu.play_button": {
  "x": 74,
  "y": 477,
  "width": 100,
  "height": 152
 },
 "undefined": {
  "x": 295.94444444444446,
  "y": 305.4999944898818,
  "width": 156.11111111111111,
  "height": 30.55555555555556
 },
 "menu.back_button": {
  "x": 737.027774810791,
  "y": 515.4138854980469,
  "width": 208,
  "height": 83.2
 },
 "game.menu_button": {
  "x": 737.027774810791,
  "y": 518.4138854980469,
  "width": 208,
  "height": 83.2
 },
 "game.back_button": {
  "x": 519.027774810791,
  "y": 517.4138854980469,
  "width": 208,
  "height": 83.2
 },
 "gameoverText": {
  "x": 64.47221925523547,
  "y": 253.68055216471353,
  "width": 821.1111111111111,
  "height": 76.66666666666667
 },
 "gameover.menu_button": {
  "x": 219.02777481079102,
  "y": 452.0138854980469,
  "width": 260,
  "height": 104
 },
 "retry": {
  "x": 310.027774810791,
  "y": 28.013885498046875,
  "width": 260,
  "height": 104
 },
 "help_text": {
  "x": 321.9444414774577,
  "y": 320.3888854980469,
  "width": 274.16666666666663,
  "height": 51.25
 },
 "options.menu_button": {
  "x": 681.5208320617676,
  "y": 486.0034713745117,
  "width": 265,
  "height": 104
 },
 "levelImage": {
  "x": 40.027774810791016,
  "y": 519.5104141235352,
  "width": 486,
  "height": 69
 },
 "scoreImage": {
  "x": 692.527774810791,
  "y": 555.5104141235352,
  "width": 243,
  "height": 69
 },
 "timeValue": {
  "x": 788.6111081441244,
  "y": 591.3715252346462,
  "width": 60.833333333333336,
  "height": 15.27777777777778
 },
 "leaderboard.score.1": {
  "x": 590.2916666666666,
  "y": 238.375,
  "width": 65.41666666666667,
  "height": 21.250000000000004
 },
 "leaderboard.name.1": {
  "x": 272.9583333333333,
  "y": 306.75,
  "width": 62.083333333333336,
  "height": 22.500000000000004
 },
 "leaderboard.name.3": {
  "x": 370.7916666666667,
  "y": 424.4583333333333,
  "width": 80.41666666666667,
  "height": 27.083333333333332
 },
 "score.levelText": {
  "x": 77.16666666666669,
  "y": 260.0416666666667,
  "width": 647.6666666666666,
  "height": 27.916666666666668
 },
 "leaderboard.header": {
  "x": 132.66666666666663,
  "y": 159.625,
  "width": 576.6666666666667,
  "height": 28.75
 },
 "leaderboard.button": {
  "x": 707,
  "y": 527.4,
  "width": 208,
  "height": 83.2
 },
 "score.arrow_down": {
  "x": 843.5,
  "y": 405,
  "width": 93,
  "height": 64
 },
 "score.arrow_up": {
  "x": 850,
  "y": 208,
  "width": 88,
  "height": 64
 },
 "score.overlay": {
  "x": 76.5,
  "y": 210.57983193277312,
  "width": 723,
  "height": 278,
  "scale": true
 },
 "congText": {
  "x": 126.16666666666669,
  "y": 17.254882289994647,
  "width": 711.6666666666666,
  "height": 119.58333333333333
 },
 "levelComplete.star": {
  "x": 330,
  "y": 237.34911717495987,
  "width": 46,
  "height": 41
 },
 "levelComplete.menuButton": {
  "x": 427.5,
  "y": 522.7777722676595,
  "width": 265,
  "height": 104
 },
 "levelComplete.nextButton": {
  "x": 696,
  "y": 520.7777722676595,
  "width": 260,
  "height": 104
 },
 "levelComplete.scoreLabel.LEADER": {
  "x": 373.6497076023392,
  "y": 266.72222222222223,
  "width": 156.11111111111111,
  "height": 30.55555555555556
 },
 "menu.buy_button": {
  "x": 650,
  "y": 261,
  "width": 208,
  "height": 83
 }
};


    return {


    	init:function(game){
        
          this.game=game;

           Template.RATIO = {
                'x': this.game.width / Template.CONFIG.WIDTH,
                'y': this.game.height / Template.CONFIG.HEIGHT

            };
      },


    	check: function () {

        this.game.world.children.forEach(

            function (entity) {

            if (entity instanceof Phaser.Group) {
         
              entity.forEach(function (subEntity) {
                      this.set(subEntity);
              }, this);

            }else{
                 this.set(entity);
            }

            }, this);

    },

    set:function(entity){

      var needScaling = false;

      if(typeof entity.label !== 'undefined'){

          if(entity.label.indexOf('.X')!= -1)return;
          if(entity.label.indexOf('.BG')!=-1){
              this.resize(entity);
          }    

          if(typeof positions[entity.label] !== 'undefined'){

            

            for(key in positions[entity.label]){

                if(key=="scale"){
                    needScaling = true;
                    continue;
                }
                entity[key]=positions[entity.label][key];
                entity['start'+key.charAt(0).toUpperCase()+key.slice(1)] = positions[entity.label][key];

            }

          }

        }else{
          console.log('Undefined label');
        }

        entity.x *= Template.RATIO.x;
        entity.y *= Template.RATIO.y;
        entity.startX *= Template.RATIO.x;
        entity.startY *= Template.RATIO.y;

        if(needScaling){

          entity.width *= Template.RATIO.x;
          entity.height *= Template.RATIO.y;
        }



    },

    force: function(entity){

      if(entity instanceof Phaser.Group ){

          entity.forEach(function(subEntity){

              this.set(subEntity);

          },this);

       }else{
          this.set(entity);
       }

  },    

    getPositions:function(){

        return positions;

    },

    resize:function(entity){
      entity.width= Template.CONFIG.WIDTH  * Template.RATIO.x;
      entity.height= Template.CONFIG.HEIGHT  * Template.RATIO.y;
    }



    };




})();
