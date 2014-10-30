 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */
;
Template.helpers.sound = (function () {


    return {

        init: function (game) {

            this.game = game;

            this.mute = false;

            this.music = null;

            this.isInit = false;

            return this;

        },




        start: function () {


            this.state = this.game.state.getCurrentState();



            if (!this.isInit) {


                this.music = this.game.add.audio('music');
                this.music.play('', 0, 1, true);

            };



            var fx_volume = 1

            if (localStorage.getItem('Template.mute') !== null) {
                this.mute = localStorage.getItem('Template.mute')
            };

            if (this.mute == 'true') {

                this.music.volume = 0;

                localStorage.setItem('Template.music_volume', 0);
                localStorage.setItem('Template.fx_volume', 0);
                localStorage.setItem('Template.mute', false);



            }
            if (localStorage.getItem('Template.music_volume') !== null) {
                this.music.volume = parseFloat(localStorage.getItem('Template.music_volume'));

            }

            if (localStorage.getItem('Template.fx_volume') !== null) {
                fx_volume = parseFloat(localStorage.getItem('Template.fx_volume'));

            }

            if (!this.music.isPlaying) this.music.play();

            this.fxSounds = this.game.add.audioSprite('fxSounds');


            this.setFxVolume(fx_volume);


            Template.helpers.entity.sound.audio = Template.helpers.sound.fxSounds;


            this.isInit = true;




        },


        setFxVolume: function (volume) {


            for (var key in this.fxSounds.markers) {

                this.fxSounds.markers[key].volume = volume;

            }


        },


        setMusicVolume: function (volume) {


            this.music.volume = volume;


        },




        musicControl: function () {

            this.state = this.game.state.getCurrentState();

            if (this.mute === true) {

                this.state.hud.musicImage.frameName = "music.png";

                this.mute = false;
                localStorage.setItem('Template.mute', false);


                this.game.sound.mute = false;
                this.music.play();




            } else {

                this.state.hud.musicImage.frameName = "music_mute.png";

                this.mute = true;
                this.game.sound.mute = true;
                this.music.stop();

                localStorage.setItem('Template.mute', true)



            }


        },









    }; })();
