var GRAPHICS = (function (g) {
	var g = {};
	g.context;
	g.canvasWidth = 500;
	g.canvasHeight = 500;
	
	g.init = function() {
		if($("#snakeCanvas")[0].getContext) {
			g.context = $("#snakeCanvas")[0].getContext("2d");
			g.clearAll();
			//Initial drawup
			
			//Draw snake
			for (i=0; i < SNAKE.snake.length; ++i) {
				g.drawBox(SNAKE.snake[i].posX,SNAKE.snake[i].posY, "black");
			}
			
			//Draw food
			for (i=0; i < SNAKE.food.length; ++i) {
				g.drawBox(SNAKE.food[i].posX,SNAKE.food[i].posY, "red");
			}
			
			//Draw walls
			g.drawWalls("red");
			
			
			return true;
		}
		else {
			return false;
		}
	};
	
	g.drawWalls = function(fillStyle) {
		g.context.fillStyle = "white";
		g.context.fillStyle = "black";
	}
		
	g.drawBox = function(x,y, fillStyle) {
		g.context.fillStyle = fillStyle;
		g.context.fillRect(x*(g.canvasWidth/SNAKE.getGameboardSize().xSize), y*(g.canvasHeight/SNAKE.getGameboardSize().ySize), g.canvasWidth/SNAKE.getGameboardSize().xSize, g.canvasHeight/SNAKE.getGameboardSize().ySize);
		//console.log("drawBox called @ x:",x,"y:", y, " size = ", 
		//(g.canvasWidth/SNAKE.getGameboardSize().xSize), "x", 
		//(g.canvasWidth/SNAKE.getGameboardSize().ySize), "fillStyle 
		//=",g.context.fillStyle);
	}
	
	g.drawEndScreen = function(fillStyle, score) {
		g.context.fillStyle = fillStyle;
		g.context.fillRect(0,0,g.canvasWidth,g.canvasHeight, fillStyle);
		g.context.textAlign = "center";
		
		g.context.fillStyle = "WHITE";
		g.context.font="36pt Comfortaa";
		g.context.fillText("GAME OVER!", g.canvasWidth/2, g.canvasWidth/2);		
	
		g.context.font="24pt Comfortaa";
		g.context.fillText("SCORE: " + score, g.canvasWidth/2, (g.canvasWidth/2) + 100);	
	}
	
	g.clearBox = function(x,y) {
		g.context.clearRect(x*(g.canvasWidth/SNAKE.getGameboardSize().xSize), y*(g.canvasHeight/SNAKE.getGameboardSize().ySize), g.canvasWidth/SNAKE.getGameboardSize().xSize, g.canvasHeight/SNAKE.getGameboardSize().ySize);
	}
	
	g.clearAll = function() {
		g.context.clearRect(0,0,10000,100000);
	}

	return g;
})(GRAPHICS || {});