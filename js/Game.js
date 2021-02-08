class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car2=createSprite(300,200);
    car3=createSprite(500,200);
    car4=createSprite(700,200);
    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index represents each player as 1/2/3/4
      var index=0;
      //x and y are the positions of the car
      var x=0,y;
      for(var plr in allPlayers){
        //increase the index for every player 
        index=index+1;
        //place the car at a distance of 200 in x direction
        x=x+200;
        //calculate the y position of the car by getting the player distance from the database 
        y= displayHeight-allPlayers[plr].distance;
        //plce the car at x and y position ,use index -1 so that player 1 is assigned the zeroth car from the cars array
        cars[index-1].x=x;
        cars[index-1].y=y;
        if (index===player.index)
        {
          //active player sprite should be red in color and place the camera along the y position of the car
          cars[index-1].shapeColor="red";
          camera.position.x=displayWidth/2;
          camera.position.y=cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
