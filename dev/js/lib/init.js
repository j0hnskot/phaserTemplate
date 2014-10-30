 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */


;Template.init = function (game) {


		var helperList = Template.CONFIG.HELPERS;


		for(helper in Template.helpers){

			Template.helpers[helper].init(game);
			console.log("Loaded :" +helper);
		}
		

    Template.CONFIG.DATA().init(game);
    Template.ALIGN.init(game);
    Template.screens.manager.init(game);
    Template.CONFIG.setGame(game);


}
