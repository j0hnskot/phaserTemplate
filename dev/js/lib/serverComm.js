 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;Template.serverComm = (function () {


        return {


            init: function (game) {


                this.game = game;

                this.getPlayerData();

                return this;


            },

            //This assign the data needed to the Template object. Besides Game and User id, everything else is used for the correct flow of the game
            //Gets called in Boot.js, line 32
            getPlayerData: function () {

             

                var data = {

                    "gameId": 1,
                    "userId": 1,
                    "userName": "john",
                    "levels": Template.CONFIG.LEVEL_CAP,
                    "currentLevel": 0
                }



                Template.GAME_ID = data.gameId;
                Template.USER_ID = data.userId;
                Template.USER_NAME = data.userName;
                // The maximum number of levels available in the game
                Template.LEVELS = data.levels;

                //The maximum level this player has playable
                Template.CURRENT_LEVEL = data.currentLevel;

                //I used local storage to simulate the loading for local testing
                if (localStorage.getItem('Template.level') !== null) {

                    Template.CURRENT_LEVEL = localStorage.getItem('Template.level');

                }

                if (localStorage.getItem('totalScore') !== null) {

                    Template.SCORE = localStorage.getItem('Template.totalScore');

                }

            },



            //retrieves the level data from the server
            //i used local json files to simulate the loading
            //This is called at Game.js , line 308
            getLevel: function (level) {

                var request = new XMLHttpRequest();


                request.open("GET", "./js/levels/" + level + ".json", false);
                request.send(null)


                return (request.responseText);

            },

            //retrieves the leaderboard data from the server
            //i used local json files to simulate the loading
            //This is called at leaderboard.js , line 37
            getLeaderboard: function () {



                var request = new XMLHttpRequest();

                request.open("GET", "./js/levels/leaderboard.json", false);
                request.send(null)
                return (request.responseText);



            },




            //sends the complete's level data to the server
            //i faked a server to simulate that
            //This is called at Game.js , line 428

            saveLevelData: function (data) {



                //used local storage to simulate save on the server
                var tempData = data;


                if (localStorage.getItem('Template.level') !== null) {

                    if (parseInt(localStorage.getItem('Template.level')) < tempData.levelNumber) {


                        localStorage.setItem('Template.level', tempData.levelNumber);


                    }


                } else {

                    localStorage.setItem('Template.level', tempData.levelNumber);

                }

                localStorage.setItem('Template.score', tempData.score);

//                var request = new XMLHttpRequest();
//                request.open("POST", "http://127.0.0.1:3000/", true);
//                request.send(data);
                return true;

            },


         
            //sends the last finished level before the player returns to menu
            //i faked a server to simulate that
            //This is called at Game.js , line 588
            sendGameEnd: function (data) {
                
//
//                var request = new XMLHttpRequest();
//                request.open("POST", "http://127.0.0.1:3000/", true);
//                request.send(data);
                return true;

            },



        }; })();
