 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.2
 * @date        27/10/2014
 */

;
Template.CONFIG = (function () {

	console.log('config')


	  var DEFAULT_WIDTH = 960,
   
    	DEFAULT_HEIGHT = 640,

			PC_LEVEL_CAP = 200,

			LITE_LEVEL_CAP = 5,

			FULL_LEVEL_CAP = 200,

			HELP_TEXT = 'TEST TEST TEST TEST\n TEST TEST',

			MOBILE = (typeof Cocoon!=='undefined')?true:false,

			LITE = (typeof IS_LITE!=='undefined')?true:false,

			URL = {
	        android: "",
	        ios: null
	    },

			EDITOR = (typeof EDITOR_DATA!='undefined')?true:false,

			game = null;

			MOBILE = true;

    return {


			"MOBILE" : MOBILE,

			"LITE" : LITE,

			"OS" : function(){
					//TODO needs testing
					if(!MOBILE)return "PC";
					if(!game.device.cocoonJS)return 'android';

					var deviceInfo = Cocoon.Device.getDeviceInfo();

					return deviceInfo.os;


				},


	    "URL" : function(){

	    		if(!MOBILE)return null;

	    		return URL[this.os()];


	    },


			"LEVEL_CAP" : (function () {
											if (!MOBILE)return PC_LEVEL_CAP;
							        if (LITE){
							        		console.log('lite')
							            return LITE_LEVEL_CAP;

							        }else{


							            return FULL_LEVEL_CAP;

							        }
						    })(),

			"DATA":function(){

								if(MOBILE){
									console.log("mobile")
										Template.data=Template.storage;
										return Template.data;

								}else{
									console.log('pc')
										Template.data=Template.serverComm;
										return Template.data;
								}
							},

				"EDITOR":{
					'EXISTS':EDITOR,
					'IS_ON': editor

				},

				"HELP_TEXT":HELP_TEXT,

				"WIDTH": DEFAULT_WIDTH,
				"HEIGHT": DEFAULT_HEIGHT,

				"setGame":function(g){
						game=g;
				}

    };



    function editor(){
    		return Template.helpers.editor.getState();
    };



})();
