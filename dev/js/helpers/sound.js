 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.2
 * @date        29/10/2014
 */
;
Template.helpers.sound = (function () {


    return {

        init: function (game) {

            this.game = game;

            this.mute = false;

            this.sounds = null;

            this.isInit = false;

            this.fxVolume = 1;

            this.musicVolume = 1;

            return this;

        },




        start: function () {


            this.state = this.game.state.getCurrentState();

            
                if (!this.isInit) {

                  this.sounds = this.game.add.audioSprite(Template.ASSETS.getDefaultSound());
                  this.sounds.play('music');


                };

          

            if (localStorage.getItem('Template.mute') !== null) {
                this.mute = localStorage.getItem('Template.mute')
            };

            if (this.mute == 'true') {

                this.sounds.get('music').volume=0;

                localStorage.setItem('Template.music_volume', 0);
                localStorage.setItem('Template.fx_volume', 0);
                localStorage.setItem('Template.mute', false);



            }
            if (localStorage.getItem('Template.music_volume') !== null) {

                this.musicVolume = parseFloat(localStorage.getItem('Template.music_volume'));

                this.sounds.get('music').volume = this.musicVolume;
            }

            if (localStorage.getItem('Template.fx_volume') !== null) {
                this.fxVolume = parseFloat(localStorage.getItem('Template.fx_volume'));
            }

           if (!this.sounds.get('music').isPlaying) this.sounds.play('music',this.musicVolume);

    
            this.setFxVolume(this.fxVolume);


            Template.helpers.entity.sound.audio = Template.helpers.sound.sounds;


            this.isInit = true;




        },


        setFxVolume: function (volume) {

            if (volume < 0) volume = 0;
            if (volume > 1) volume = 1;
            
            this.fxVolume = volume;

            for (var key in this.sounds.sounds) {
              
                if(key==='music')continue;
                this.sounds.sounds[key].volume = volume;

            }

           localStorage.setItem('Template.fx_volume', 0 + volume);

        },


        setMusicVolume: function (volume) {

            if (volume < 0) volume = 0;
            if (volume > 1) volume = 1;

            this.musicVolume = volume;

            this.sounds.get('music').volume = volume;
            localStorage.setItem('Template.music_volume', volume);



        },




        musicControl: function () {

            this.state = this.game.state.getCurrentState();

            if (this.mute === true) {

                this.state.hud.musicImage.frameName = "music.png";

                this.mute = false;
                localStorage.setItem('Template.mute', false);


                this.game.sound.mute = false;
                this.sounds.play('music',this.musicVolume);




            } else {

                this.state.hud.musicImage.frameName = "music_mute.png";

                this.mute = true;
                this.game.sound.mute = true;
                this.sounds.stop();

                localStorage.setItem('Template.mute', true)



            }


        },


        play:function(key,isMusic){

            this.sounds.play(key,this.fxVolume)

        },









    }; })();
