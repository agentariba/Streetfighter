var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) { setTimeout (callback, 1000 / 30); };

var canvas = document.getElementById("canvas-id");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
//---------------------------------------------------------------------------------------------------------------------------------------------

var player1X=250, player1Y=300,   //liav igrach ili komp
    player2X=650, player2Y=300,   //desen igrach =myX I myY
    arm1x=player1X, arm2x=player2X,             
             
    udararm1=0, udarleg1=0, 
    udararm2=0, udarleg2=0,
    
    moveleg1=1, movearm1=1, 
    moveleg2=1, movearm2=1,
    
   // goPosition=Math.random()*1000,
    goPosition=-3+Math.random()*13;
    changePositionTime=0;
    
    player1Win=false;
    player2Win=false;

    color1="green", color2="green", healthsize1=350, healthsize2=350, health2x=570,      //healthbars
    
    mishkaX=0, mishkaY=0,  posoka1=0, posoka2=0, skorost=20,
    
    chooseGameType=true, singleplayer=false, multiplayer=false, gameOver=false;

    mainscreen=new Image();
    mainscreen.src="mainscreen with directions.png";

//----------------------------------------------------------------------------------------------------
window.addEventListener("mouseup", function (args) {
    mishkaX=args.clientX-canvas.offsetLeft;
    mishkaY=args.clientY-canvas.offsetTop;
    
if(chooseGameType==true && mishkaX>=0 && mishkaX<=500 && mishkaY>=0 && mishkaY<=500 && singleplayer==false){
    chooseGameType=false;
    singleplayer=true;
    multiplayer=false;
}
    
if(chooseGameType==true && mishkaX>=500 && mishkaX<=1000 && mishkaY>=0 && mishkaY<=500 && multiplayer==false){
    chooseGameType=false;
    multiplayer=true;
    singleplayer=false;
}
//------------------------------------------ CHOOSE GAME TYPE ---------------------------------------------------
}, false);

window.addEventListener("keydown", function (args) {
    console.log(args.which);
    
    
    if(multiplayer==true){   
if(args.which==65)
    posoka1=args.which;
if(args.which==68)
     posoka1=args.which;     
if(args.which==87)
     posoka1=args.which; 
if(args.which==83)
     posoka1=args.which;
    }
    
    
    //-------------------------------------------- player1 (robot) ----    
if(args.which==37)  
    posoka2=args.which;
if(args.which==39)
     posoka2=args.which;             //??sukrati redovete za dvijenie chrez cikul FOR??
if(args.which==38)
     posoka2=args.which; 
if(args.which==40)
     posoka2=args.which;
    //-------------------------------------------- player2 ----
//--------------------------  DVIJENIE 2------------------------------------- x2 

    
    if(multiplayer==true)   
if(args.which==16)
    udararm1=args.which; 
    
if(args.which==32)
    udararm2=args.which;
//--------------------------  UDAR ARM 2------------------------------------- x2   
    
    console.log(args.which);
}, false);



function update() {

if(gameOver==false){
    
 if(singleplayer==true){
     
     player1X+=goPosition;
     changePositionTime++;
     
     if(changePositionTime>30){
         changePositionTime=0;
         goPosition=-5+Math.random()*10;
     }
         
     
     
     if(player1X>=player2X-200){
         
         udararm1++;
              //player1X=+2;
     if(udararm1>16)
        udararm1=15;
     }
 }
 /*    
  if(goPosition>player1X)
do{
        player1X-=3;               //dobaviane na skorost
}while (goPosition<player1X)
        
    else if(goPosition<player1X)
do 
        player1X+=3;               //dobaviane na skorost
while (goPosition>player1X)

    
        goPosition=Math.random()*1000;
*/
        
}
//-------------------------------------- SINGLEPLAYER ----------------------    
    
if(posoka1==65){
player1X=player1X-25;       //dvijenie naliavo 
posoka1=0;
}  
if(posoka1==68){         
player1X=player1X+25;       //dvijenie nadiasno
posoka1=0;
}
    //------------------------------------------------------    
if(posoka2==37){
player2X=player2X-25;       //dvijenie naliavo
posoka2=0;
}   
if(posoka2==39){         
player2X=player2X+25;       //dvijenie nadiasno
posoka2=0;
}
//----------------------------------------- DVIJENIE-------------x2    
    
if(udararm1<16)  //!!!!!!!  
arm1x=player1X;
          
if(udararm1==16){
arm1x=player1X-movearm1;
movearm1=movearm1-15;
if(arm1x>=player1X+80){
    movearm1=1;
    udararm1=0;
    arm1x=player1X;
}

}
if(udararm2==0)    
arm2x=player2X;
          
if(udararm2==32){
arm2x=player2X-movearm2;
movearm2=movearm2+15;
if(arm2x<=player2X-80){
    movearm2=1;
    udararm2=0;
    arm2x=player2X;  
}
}
//----------------------------------------- FIST PUNCH ------------- x2       

    
if(gameOver==false){    
    
if(player1X+80>=arm2x){
    player1X=player1X-15;
    healthsize1=healthsize1-3;
}
if(player2X<=arm1x+80){
    player2X=player2X+15;
    healthsize2=healthsize2-3;
    health2x=health2x+3;
}
}   //------------------------------------------------------------<-----------------------< GAMEOVER END -<------
    
if(healthsize1<100)             // low health=>red colour /player1/
    color1="red";
if(healthsize2<100)             // low health=>red colour /player2/
    color2="red";
     
//----------------------------------------- HELATHBARS ---- ------------------   
    if(healthsize1<=0){
    healthsize1=0;
    player1Y=player1Y-100;
    gameOver=true;
    player2Win=true;
    }
    
    if(healthsize2<=0){
    healthsize2=0;
    player2Y=player2Y-100;
    gameOver=true;
    player1Win=true;
    }
//----------------------------------------- MOVE BACK WHEN PUCHED/ GET HURT ----  
       
if(player1X<=0)
    player1X=0;
    
if(player1X>=920)
    player1X=920;
    
if(player2X<=0)
    player2X=0;
    
if(player2X+80>=1000)
    player2X=920;
//----------------------------------------- STAY IN THE SCREEN -------------------    
    
    

    
    setTimeout(update, 10); 
}



function draw() {       
    context.clearRect(0, 0, canvas.width, canvas.height);       
    context.globalAlpha = 1;                                   

context.fillStyle = "grey";         //background
context.fillRect(0, 0, 1000, 500); 
//----------------------------------------- BACKGROUND -------------------    
    context.fillStyle = "#8FBC8F";        
    context.fillRect(27, 8, 356, 19);      //behind health1
    
    context.fillStyle = "#8FBC8F";        
    context.fillRect(567, 8, 356, 19);     //behind health2
//----------------------------------------- BEHIND HEALTH ----  X2  
        
    context.fillStyle = color1;        
    context.fillRect(30, 10, healthsize1, 15);      //health player1

    context.fillStyle = color2;        
    context.fillRect(health2x, 10, healthsize2, 15);      //health player2
    
 //---------------------------   HEALTHBARS ------------------------- x2
    context.fillStyle = "#FF5000";
    context.fillRect(player1X, player1Y, 80, 200); 

    context.fillStyle = "green";        //mYplayer
    context.fillRect(player2X, player2Y, 80, 200);
    
//---------------------------   PLAYERS   ----------------------------------------   PLAYERS   ------------------------x2
    
    context.fillStyle = "#FF5000";
    context.fillRect(arm1x, player1Y+50, 80, 30);      //arm player1
    context.fillStyle = "green";
    context.fillRect(arm2x, player2Y+50, 80, 30);      //arm player2
    
//---------------------------   ARMS   -----------------------x2
    
    if(player1Win==true){
        context.globalAlpha = 0.5;
        context.fillStyle = "grey"; //background
        context.fillRect(0, 0, 1000, 1000);
        context.fillStyle = "black";
        context.fillText("PLAYER 1 WINS!",200,200);
        context.font="72px Ariel";   
    }
    if(player2Win==true){
        context.globalAlpha = 0.5;
        context.fillStyle = "grey"; //background
        context.fillRect(0, 0, 1000, 1000);
        context.fillStyle = "black";
        context.fillText("PLAYER 2 WINS!",200,200);
        context.font="72px Ariel"; 
    }
    
    
//-------------------------- WINNING TEXT --------------------------x2    
    if(chooseGameType==true)
context.drawImage(mainscreen, 0, 0, 1000, 500);     
    
    
    requestAnimationFrame(draw);        
}
update();       
draw(); 