 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        28/10/2014
 */

;

Template.ASSETS = (function () {

  

    

    var PC_ASSETS={
      "atlases":{

        "q":{
          "image":"sprites.png",
          "data": "sprites.js"
        }

      },
      "images":{
        "help_screen":{
          "image":"help_screen.png"
        },
        "options_screen":{
          "image":"options_screen.png"
        }
      },

      "sounds":{

        "sound-pack-1":{
          "file":"output.ogg",
          "data":"output.json",
          "default":true
        },

      },

      "fonts":{
        "font":{
          "image":"font.png",
          "data":"font"

        },
      },

    };

    var MOBILE_ASSETS={
    "atlases":{

        'q':{
          'image':'sprites.png',
          'data': 'sprites.js'
        }

      },
      "images":{},

      "sounds":{

        "sounds":{
          "file":"output.ogg",
          "data":"output.json",
          "default":true
        },

      },

      "fonts":{
        "font":{
          "image":"font.png",
          "data":"font"

        },
      },
};


  var defaultSound = null;


    return {

      init:function(game){

        this.game=game;

       var selectedAssets=null;

      (Template.CONFIG.MOBILE)?selectedAssets=MOBILE_ASSETS : selectedAssets=PC_ASSETS;


      for(key in selectedAssets.atlases){
        console.log("Loading : " +key);

        this.game.load.atlasJSONHash(key, 'assets/'+Template.QUALITY.get()+selectedAssets.atlases[key].image, 'assets/'+Template.QUALITY.get()+selectedAssets.atlases[key].data)


      }

      for(key in selectedAssets.images){
        console.log("Loading : " +key);

        this.game.load.image(key, 'assets/'+Template.QUALITY.get()+selectedAssets.images[key].image)


      } 

      for(key in selectedAssets.sounds){
        console.log("Loading : " +key);
        if(typeof selectedAssets.sounds[key].data!=='undefined'){

          console.log('It\'s audiosprite.')
           this.game.load.audiosprite(key,'assets/sound/'+selectedAssets.sounds[key].file,'assets/sound/'+selectedAssets.sounds[key].data)


        }else{
          this.game.load.audio(key, 'assets/sound/'+selectedAssets.sounds[key].file);


        }

        if(typeof selectedAssets.sounds[key].default !== 'undefined')defaultSound = key;


      } 

      var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.fnt';

      for(key in selectedAssets.fonts){
        console.log("Loading : " +key);

        this.game.load.bitmapFont(key, 'assets/font/' + selectedAssets.fonts[key].image, 
                            'assets/font/'+selectedAssets.fonts[key].data + fileFormat);


      }




      },

      set:function(entity,key,type){

        if(type===null)type='image';

        var selectedAssets=null;

       (Template.CONFIG.MOBILE)?selectedAssets=MOBILE_ASSETS : selectedAssets=PC_ASSETS;

        if(typeof selectedAssets.images[key] !== 'undefined' || this.game.cache.checkImageKey(key)){

            entity.loadTexture(key);
        }else{

          entity.frameName=key+'.png';
        }


      },


      getDefaultSound: function(){

        return defaultSound;
      },


   };


})();
