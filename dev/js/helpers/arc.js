 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */


;Template.helpers.arc = (function () {


    return {

        init:function(game){

            this.game=game;
            return this;

        },


        to: function (object, target, height, time) {

            height = height || 200;

            var objectToTargetX = this.game.add.tween(object).to({
                x: target.x
            }, time, null, true);


            var objectToTargetY = this.game.add.tween(object).to({
                y: target.y,

            }, time / 2, Phaser.Easing.Sinusoidal.In)


            var objectToHeight = this.game.add.tween(object)

            objectToHeight.to({
                y: object.y + height
            }, time / 2, Phaser.Easing.Sinusoidal.Out, true).onComplete.addOnce(function () {

                objectToTargetY.start();


            }, this);

            return [objectToTargetX, objectToHeight, objectToTargetY];
        },





    };
})();
