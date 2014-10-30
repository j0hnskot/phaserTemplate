 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;Template.storage = (function () {


        return {


            init: function (game) {


                this.game = game;

                this.getPlayerData();

                return this;


            },


            getPlayerData: function () {


                var data = {

                    "levels": Template.CONFIG.LEVEL_CAP,
                    "currentLevel": 0
                }

           
                

                // The maximum number of levels available in the game
                Template.LEVELS =  Template.CONFIG.LEVEL_CAP;

                //I used local storage to simulate the loading for local testing
                if (localStorage.getItem('Template.level') !== null) {

                    Template.CURRENT_LEVEL = localStorage.getItem('Template.level');

                }else{

                    Template.CURRENT_LEVEL=0;
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


                return;


            },


            saveLevelData: function (data) {
                var previousLevelData = {};
                if (localStorage.getItem('Template.levelData')) {

                    previousLevelData = localStorage.getItem('Template.levelData');
                    previousLevelData = JSON.parse(previousLevelData)


                }

                console.log(data)

                var currentData = {

                    "accuracy": data.accuracy,
                    "stars": data.stars,
                    "score": data.levelScore,
                    "speed": data.speed

                }


                if (previousLevelData[data.levelNumber] !== undefined) {


                    if (parseInt(previousLevelData[data.levelNumber].stars) < currentData.stars) {
                        previousLevelData[data.levelNumber].stars = currentData.stars;
                    }
                    if (parseInt(previousLevelData[data.levelNumber].accuracy) < currentData.accuracy)
                        previousLevelData[data.levelNumber].accuracy = currentData.accuracy;

                    if (parseInt(previousLevelData[data.levelNumber].score) < currentData.score)
                        previousLevelData[data.levelNumber].score = currentData.score;

                    if (parseInt(previousLevelData[data.levelNumber].speed) < currentData.speed)
                        previousLevelData[data.levelNumber].speed = currentData.speed;


                } else {

                    previousLevelData[data.levelNumber] = currentData;

                }


                previousLevelData = JSON.stringify(previousLevelData)

                localStorage.setItem('Template.levelData', previousLevelData);

                if (localStorage.getItem('Template.level') !== null) {

                    if (parseInt(localStorage.getItem('Template.level')) < data.levelNumber) {


                        localStorage.setItem('Template.level', data.levelNumber);


                    }


                } else {

                    localStorage.setItem('Template.level', data.levelNumber);

                }





            },

            //sends the last finished level before the player returns to menu
            //i faked a server to simulate that
            //This is called at Game.js , line 588
            sendGameEnd: function (data) {

                return;

            },



        }; })();
