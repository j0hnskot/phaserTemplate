;Template.TIME = (function () {


    return {



        init: function (game) {

            this.game = game;
            this.state = this.game.state.getCurrentState();

            return this;
        },

        create: function (isClock, simpleCount) {

            this.isClock = isClock || false;
            this.simpleCount = simpleCount || false;
            this.timer = this.game.time.create();

        },


        control: function (command) {

            if (['play', 'stop', 'pause', 'resume'].indexOf(command) != -1) {

                this.timer[command]();

            } else {

                console.log("Incorrect timer command");
            }



        },



        applyLimit: function (limit) {

            this.usingTimeLimit = true;


            var minuteMS = (limit.minutes * 60) * 1000;
            var secondMS = limit.seconds * 1000;

            this.timeLimit = minuteMS + secondMS;




        },

        inLimit: function () {



        },


        getMinutes: function () {

            var minutes = 0;





        },

        getSeconds: function () {

            var seconds = 0;




        },

        timeCheck: function (simpleCount) {

            if (this.level !== '') {

                var minutes = 0;
                var seconds = 0;

                if (simpleCount) {


                    minutes = Math.floor(this.levelTimer.ms / 60000) % 60;
                    seconds = Math.floor(this.levelTimer.ms / 1000) % 60;
                    if (seconds < 10)
                        seconds = '0' + seconds;

                    if (minutes < 10)
                        minutes = '0' + minutes;




                } else {

                    var timeLeft = Math.round((this.timeLimit - this.levelTimer.ms) / 1000);

                    minutes = Math.floor(timeLeft / 60);
                    seconds = timeLeft - (60 * minutes);

                    if (seconds < 10)
                        seconds = '0' + seconds;

                    if (minutes < 10)
                        minutes = '0' + minutes;


                    if (Math.floor(this.levelTimer.ms / 1000) >= this.timeLimit / 1000 && this.levelTimer.paused !== true && !this.reachedHouse) {
                        this.gameOver = true;
                        this.canClick = false;
                        this.levelTimer.stop()
                        this.showGameOver();
                    }




                }


                //changes the time=bar size
                if (this.levelTimer.ms / 1000 > 0) {

                    if (!this.hud.timeClock) {
                        var cropRect = {
                            x: 0,
                            y: 0,
                            width: 240 - ((this.levelTimer.ms / 1000) / (this.timeLimit / 1000)) * 240,
                            height: this.hud.timeBar.height
                        };

                        this.hud.timeBar.crop(cropRect);
                    } else {
                        this.hud.timeValue.text = minutes + ' : ' + seconds;
                    }

                } else {
                    //a fix to prevent a bug currently in phaser.
                    this.levelTimer.destroy();
                    this.levelTimer = this.time.create();
                    this.levelTimer.start();
                }

            }




        },


        applyTime: function () {




        },



    };
})();
