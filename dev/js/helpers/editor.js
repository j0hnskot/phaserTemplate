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
    dataDiv.style.overflow = "scroll";
    dataDiv.setAttribute('id','editorPrint');

    var infoDiv = document.createElement("div");
    infoDiv.style.position='fixed';
    infoDiv.style.top='10px';
    infoDiv.style.width="200px";
    infoDiv.style.height="200px";
    infoDiv.style.overflow = "scroll";
    infoDiv.setAttribute('id','info');
    infoDiv.innerHTML=''+
   
    'x: <input id="entityX" type="text" name="fname"><br>'
    +'y: <input id="entityY" type="text" name="lname"><br>'
    +'width: <input id="entityWidth" type="text" name="lname"><br>'
    +'height: <input id="entitHeight" type="text" name="lname"><br>'
    +'<button id="saveData">OK</button>';
    





    return {

        init:function(game){
            
            document.body.appendChild(infoDiv);
            document.body.appendChild(dataDiv);

            document.getElementById('saveData').onclick = this.save.bind(this)
           

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
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) active=!active;
        if(!active)return;
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)) print();
         
        if(!this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL))return;

        if(this.selectedEntity===null)this.find();
        if(this.selectedEntity===null)return;


        if (   this.game.input.keyboard.isDown(37) 
            || this.game.input.keyboard.isDown(38)
            || this.game.input.keyboard.isDown(39)
            || this.game.input.keyboard.isDown(40))
        {
            this.arrowMoving=true;
            this.move(this.selectedEntity);

        }




    },

    released:function(){
            
            if(this.game.input.keyboard.justReleased(17))this.save();


    },

    save: function(){

            if(this.selectedEntity===null)return;
    
            if(typeof EDITOR_DATA[this.selectedEntity.label]==='undefined')EDITOR_DATA[this.selectedEntity.label]={};

            EDITOR_DATA[this.selectedEntity.label].x=this.selectedEntity.x;

            EDITOR_DATA[this.selectedEntity.label].y=this.selectedEntity.y;

            EDITOR_DATA[this.selectedEntity.label].width=this.selectedEntity.width;

            EDITOR_DATA[this.selectedEntity.label].height=this.selectedEntity.height;


            this.selectedEntity.startX= this.selectedEntity.x;
            this.selectedEntity.startY= this.selectedEntity.y;
            this.selectedEntity.update=function(){};
            this.selectedEntity=null;
            this.arrowMoving=false;
            
          



    },


    find:function(){


        this.selectedEntity=null;
       

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
                 if ( typeof self.anchor !=='undefined' && self.anchor.x ==0.5) {
                
                     self.x=this.game.input.activePointer.x;
                     self.y=this.game.input.activePointer.y;
                }else{

                    self.x=this.game.input.activePointer.x-self.width/2;

                    self.y=this.game.input.activePointer.y-self.height/2;


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
                           
                            this.selectedEntity=entity;


                        }



},


    move:function(entity){

           if(this.game.input.keyboard.isDown(37))entity.x--;    
           if(this.game.input.keyboard.isDown(39))entity.x++;    
           if(this.game.input.keyboard.isDown(38))entity.y--;    
           if(this.game.input.keyboard.isDown(40))entity.y++;    
       


    },


    getState:function(){
        return active;
    },

    
     




    };


    function print(){

        var editor_tag=document.getElementById('editorPrint');
          
            editor_tag.innerHTML="<pre>"+JSON.stringify(EDITOR_DATA,null ," ")+"</pre>" 

    };



})();










