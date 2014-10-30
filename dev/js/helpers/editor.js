 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;EDITOR_DATA={};






;Template.helpers.editor = (function () {

    var active = false;


    var dataDiv = document.createElement("div");
    dataDiv.style.width="300px";
    dataDiv.style.position='fixed';
    dataDiv.style.top= '350px';
    dataDiv.setAttribute('id','editorPrint');

    var infoDiv = document.createElement("div");
    infoDiv.style.position='fixed';
    infoDiv.style.top='10px';
    infoDiv.style.width="200px";
    infoDiv.style.height="300px";
    infoDiv.style.overflow = "scroll";
    infoDiv.setAttribute('id','info');
    infoDiv.innerHTML=''+
   
    'X: <input id="entityX" type="text" name="fname"><br>'
    +'Y: <input id="entityY" type="text" name="lname"><br>'
    +'Width: <input id="entityWidth" type="text" name="lname"><br>'
    +'Height: <input id="entityHeight" type="text" name="lname"><br>'
    +'Leader: <input id="entityLeader" type="text" readonly="readonly"  name="lname"><br>'
    +'<button id="saveData">OK</button>';
    
   infoDiv.style.display='none';
   dataDiv.style.display='none';




    return {

        init:function(game){
            
            document.body.appendChild(infoDiv);
            document.body.appendChild(dataDiv);

            document.getElementById('saveData').onclick = this.save.bind(this,true);
     

           

            this.game=game;

            this.rect = new Phaser.Rectangle(0, 0, 0, 0);

            this.selectedEntity = null;

            EDITOR_DATA=Template.ALIGN.getPositions();

            this.game.input.keyboard.onDownCallback=this.pressed.bind(this)
            this.game.input.keyboard.onUpCallback=this.released.bind(this)
            return this;

        },


        pressed: function () {

        if (!Template.CONFIG.EDITOR ) return
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) this.toggle();
        if(!active)return;
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)) this.print();
         
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL))this.find();

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC))this.reset();
        



    },


    released:function(){
            
           if(this.game.input.keyboard.justReleased(17)){
            this.save();
            if(this.selectedEntity!==null)this.selectedEntity.dragged=false;
           }


    },


    toggle:function(){
        active=!active;

        if(active){
            console.log('q')
            infoDiv.style.display='block';
            dataDiv.style.display='block';
        }else{
            console.log('asd')
            infoDiv.style.display='none';
             dataDiv.style.display='none';
        }
    },

    


    find:function(){


       this.save();
        // this.selectedEntity = null;
       

        this.game.world.children.forEach(

            function (q) {

                if (q instanceof Phaser.Group) {
               
                    q.forEach(function (s) {

                          this.select(s);

                    }, this)
            }else{

                 this.select(q);


            }

            }, this);


        if(this.selectedEntity!==null){
            
            this.selectedEntity.update=function(self){

                if(this.arrowMoving)return;  
                if(self.dragged){
                     if ( typeof self.anchor !=='undefined' && self.anchor.x ==0.5) {
                    
                         self.x=this.game.input.activePointer.x;
                         self.y=this.game.input.activePointer.y;
                    }
                    else{

                        self.x=this.game.input.activePointer.x-self.width/2;

                        self.y=this.game.input.activePointer.y-self.height/2;



                     }
                 this.updateTextFields()

                }else{
                   this.getValuesFromTextFields()
                }



            }.bind(this,this.selectedEntity)


        }   





    },



    select:function(entity){


           if(entity.label.indexOf('.BG')!= -1 || entity.visible==false || entity.label.indexOf('.X')!= -1)return;
           if ( typeof entity.anchor !=='undefined' && entity.anchor.x ==0.5) {

                            this.rect.x = entity.x - entity.width / 2;
                            this.rect.y = entity.y - entity.height / 2;


                        } else {
                            this.rect.x = entity.x;
                            this.rect.y = entity.y;

                        }
                        this.rect.width = entity.width;
                        this.rect.height = entity.height;

                        if (Phaser.Rectangle.contains(this.rect, this.game.input.x, this.game.input.y)) {
                            
                            this.resetSelectedEntity();
                            this.selectedEntity=entity;             
                            this.selectedEntity.dragged = true;

                            if(typeof this.selectedEntity.initX ==='undefined'){

                                this.selectedEntity.initX = this.selectedEntity.x;
                                this.selectedEntity.initY = this.selectedEntity.y;
                                this.selectedEntity.initWidth = this.selectedEntity.width;
                                this.selectedEntity.initHeight = this.selectedEntity.height;

                            }
                        
                            if(this.selectedEntity.label.indexOf('.LEADER')!=-1){
                                 document.getElementById('entityLeader').value = 'TRUE';

                            }else{
                                 document.getElementById('entityLeader').value = 'FALSE';

                            }


                        }



},

save: function(clear){

            if(this.selectedEntity===null)return;
            console.log('saving')
    
            if(typeof EDITOR_DATA[this.selectedEntity.label]==='undefined')EDITOR_DATA[this.selectedEntity.label]={};

            EDITOR_DATA[this.selectedEntity.label].x=this.selectedEntity.x;

            EDITOR_DATA[this.selectedEntity.label].y=this.selectedEntity.y;

            EDITOR_DATA[this.selectedEntity.label].width=this.selectedEntity.width;

            EDITOR_DATA[this.selectedEntity.label].height=this.selectedEntity.height;


            this.selectedEntity.startX= this.selectedEntity.x;
            this.selectedEntity.startY= this.selectedEntity.y;
            this.selectedEntity.startWidth= this.selectedEntity.width;
            this.selectedEntity.startHeight= this.selectedEntity.height;

            if(clear===true)this.resetSelectedEntity();
            
    },

    reset: function(){

        if(this.selectedEntity===null)return;
        console.log('reset')
        console.log(this.selectedEntity.initX)

        this.selectedEntity.x = this.selectedEntity.initX;
        this.selectedEntity.y = this.selectedEntity.initY;

        if(this.selectedEntity instanceof Phaser.BitmapText){
            this.updateTextFields();
            return;
        }

        this.selectedEntity.width = this.selectedEntity.initWidth;
        this.selectedEntity.height = this.selectedEntity.initHeight;
        this.updateTextFields();






    },


    


    updateTextFields:function(){

        document.getElementById('entityX').value=this.selectedEntity.x;
        document.getElementById('entityY').value=this.selectedEntity.y;

        if(this.selectedEntity instanceof Phaser.BitmapText)return

        document.getElementById('entityWidth').value=this.selectedEntity.width;
        document.getElementById('entityHeight').value=this.selectedEntity.height;



    },

    getValuesFromTextFields:function(){

        var x = document.getElementById('entityX').value;
        if(isNaN(x))x=0;

        var y = document.getElementById('entityY').value;
        if(isNaN(y))y=0;

            
        this.selectedEntity.x = parseInt(x);
        this.selectedEntity.y = parseInt(y);

        if(this.selectedEntity instanceof Phaser.BitmapText)return
         
        var width = document.getElementById('entityWidth').value;
        if(isNaN(width))width=0;

        var height = document.getElementById('entityHeight').value;
        if(isNaN(height))height=0;

        this.selectedEntity.width = parseInt(width);
        this.selectedEntity.height = parseInt(height);

    },


    resetSelectedEntity:function(){

        if(this.selectedEntity!==null){
            this.selectedEntity.update=function(){};
            this.selectedEntity= null;

        }
    },


    print: function(){

        this.save();
        this.resetSelectedEntity();

        var currentDate = new Date(); 
        var dateTime = "" 
                + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds();

        var editor_tag=document.getElementById('editorPrint');
          
            editor_tag.innerHTML="LastSave at: " + dateTime+ "<br>Copy bellow <br> <textarea style=\"height:200px\" onclick='this.focus();this.select()'>"+JSON.stringify(EDITOR_DATA,null ," ")+"</textarea>" 

    },


    getState:function(){
        return active;
    },


  };


})();










