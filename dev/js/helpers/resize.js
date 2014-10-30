 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

; //TODO REMOVE
Template.helpers.resize = (function () {


    return {


        init: function (game) {

            this.game = game;


            return this;

        },

        scale: function (sprite) {

         sprite.scale.x     *=Template.RATIO.x;
         sprite.scale.y     *=Template.RATIO.y;
         sprite.startX      = sprite.x;
         sprite.startY      = sprite.y;
         sprite.startWidth  = sprite.width;
         sprite.startHeight = sprite.height;

         return sprite;

    },







    };
})();
