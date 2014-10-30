 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        27/10/2014
 */

;

Template.QUALITY = (function () {

    var quality = 'high_res';

    return {

      set:function(){

        if(!Template.CONFIG.MOBILE){

          quality='desktop/';
          return

        }

       

        var w = window.innerWidth,
            h = window.innerHeight;
        if (Template.RATIO.x == 1) {
            quality = 'med_res';
            w *= window.devicePixelRatio;
            h *= window.devicePixelRatio;
            console.log(w)
            console.log(h)
            if (w <= Template.CONFIG.WIDTH && h <= Template.CONFIG.HEIGHT) {
                if (w <= 480 && h <= 320) {

                    quality = 'low_res';


                } else {

                    quality = 'med_res';
                }
            }



        }

        quality = 'mobile/'+ quality + '/'

        console.log(Template.QUALITY.get());



      },


      get:function(){

        return quality;

      }

   };


})();
