 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */


;Template.helpers.handCursor = (function () {


    return {

        init:function(game){

            this.game=game;
            this.rect = new Phaser.Rectangle(0, 0, 0, 0);
            return this;

        },


         check: function () {

        if (!this.game.device.desktop ) return

        var touchingButton = false;

        this.game.world.children.forEach(

            function (q) {

                if (!(q instanceof Phaser.Group)) {
                    return;
                }
                if(!q.visible)return;
                
                q.forEach(function (s) {

                    if (!(s instanceof Phaser.Button) || !s.visible) {
                        return;
                    }

                    if (s.anchor.x == 0.5) {

                        this.rect.x = s.x - s.width / 2;
                        this.rect.y = s.y - s.height / 2;


                    } else {
                        this.rect.x = s.x;
                        this.rect.y = s.y;

                    }

                    this.rect.width = s.width;
                    this.rect.height = s.height;

                    if (Phaser.Rectangle.contains(this.rect, this.game.input.x, this.game.input.y)) {
                        touchingButton = true;

                    }




                }, this)


            }, this);

        if (touchingButton) {

            this.game.canvas.style.cursor = "pointer";
        } else {
            this.game.canvas.style.cursor = "default";
        }


    },

     




    };
})();










