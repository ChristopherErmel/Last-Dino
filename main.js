//Christopher Ermel

// Getting all wrappers and items to store in variables
let mainWrapper = document.getElementById('mainWrapper');
let bottomWrapper = document.getElementById('bottomWrapper');
let player = document.getElementById('playerModel');
let title = document.getElementById('lastDino');
let gameInstr = document.getElementById('gameInstr');
let levels = document.getElementsByClassName('levels');

/// store key codes and currently pressed ones
let keys = {};
    keys.UP = 87;
    keys.LEFT = 65;
    keys.RIGHT = 68;
    keys.DOWN = 83;
    keys.JUMP = 32;
    keys.DAMMAGE = 84;
    keys.FIREBALL = 70;
    keys.SCORE = 89;
    keys.START = 80;

/// store reference to character's position and element
let playerModel = {
  x: 45,
  y: -25,
  jumping: false,
  jumptime: 0,
  jetpack: true,
  speedMultiplier: 10,
  inGameTime: 0,
  inGameScore: 0,
  groundCollision: false,
  beamCollision: false,
  animatedClouds: false,
  playerIdle: false,
  playerIdleB: false,
  playerRunRight: false,
  playerRunLeft: false,
  playerRunUp: false,
  playerRunDown: false,
  playerJump: false,
  playerLastMovement: '',
  playerHealth: 6,
  playerInvincible: false,
  fireBallAmount: 0,
  fireBalls: [],
  fireBallSpawnRate: 0,
  lastFireBallId: 0,
  element: document.getElementById("playerModel"),
  playerStart: false
};

/// key detection (better to use addEventListener, but this will do)
document.body.onkeyup = 
document.body.onkeydown = function(e){
  let kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

/// character movement update
let movePlayer = function(dx, dy){
  playerModel.x += (dx||0) * playerModel.speedMultiplier;
  playerModel.y += (dy||0) * playerModel.speedMultiplier;
  playerModel.element.style.left = playerModel.x + '%';
  playerModel.element.style.top = playerModel.y + '%';
};

//jumping a player
let jumpPlayer = function(){
  if(playerModel.jumptime >= 0 && playerModel.jumptime < 8){
  	playerModel.y += (-2||0);
  	playerModel.element.style.top = playerModel.y + '%';
  	playerModel.jumptime ++;
  	playerModel.jumping = true;
  }else if(playerModel.jumptime >= 8 && playerModel.jumptime < 16){
  	playerModel.y += (2||0);
  	playerModel.element.style.top = playerModel.y + '%';
  	playerModel.jumptime ++;
  	playerModel.jumping = true;
  }else if(playerModel.jumptime >= 16){
  	playerModel.jumptime = 0;
  	playerModel.jumping = false;
  }
};

//detection for a jumping player, keep animation going.
let detectPlayerJump = function(){
	if(playerModel.jumping == true){
		jumpPlayer();
	}
}

/// character control
let detectPlayerMovement = function(){
	//250
	if(playerModel.inGameTime > 250){		
	    if ( keys[keys.LEFT]) {
	    	if(playerModel.playerRunLeft == false){
	    		  playerModel.playerRunRight = false;
	      playerModel.playerRunLeft = true;
	      playerModel.playerRunUp = false;
	      playerModel.playerRunDown = false;
	      playerModel.playerIdle = false;
	      playerModel.playerIdleB = true;
	      movePlayerStyleReset();
	      movePlayerLeft();
	    	}	    
	      movePlayer(-.1, 0.0);
	      playerModel.playerLastMovement = 'LEFT';
	    }
	    else if ( keys[keys.RIGHT]) {
	    	if(playerModel.playerRunRight == false){
	    		  playerModel.playerRunRight = true;
			      playerModel.playerRunLeft = false;
			      playerModel.playerRunUp = false;
			      playerModel.playerRunDown = false;
			      playerModel.playerIdle = false;
			      playerModel.playerIdleB = false;
			      movePlayerStyleReset();
			      movePlayerRight();
	    	}	      
	      movePlayer(0.1, 0.0);
	      playerModel.playerLastMovement = 'RIGHT';      
	    }
	    else if ( keys[keys.UP]) {
	    	if(playerModel.playerRunUp == false){
	    		playerModel.playerRunRight = false;
	      		playerModel.playerRunLeft = false;
	      		playerModel.playerRunUp = true;
	      		playerModel.playerRunDown = false;
	      		playerModel.playerIdle = false;	      		
	      		movePlayerStyleReset();
	      		if(playerModel.playerIdleB != true){
	    			movePlayerRight();
	    		}else{
	    			movePlayerLeft();
	    		}
	    	}	    		      
	      movePlayer(0.0, -0.1);
	      playerModel.playerLastMovement = 'UP';
	    }
	    else if ( keys[keys.DOWN] && playerModel.groundCollision != true) {
	    	if(playerModel.playerRunDown == false){
	    		playerModel.playerRunRight = false;
	      playerModel.playerRunLeft = false;
	      playerModel.playerRunUp = false;
	      playerModel.playerRunDown = true;
	      playerModel.playerIdle = false;	      
	      movePlayerStyleReset();
	      if(playerModel.playerIdleB != true){
	    			movePlayerRight();
	    		}else{
	    			movePlayerLeft();
	    		}
	    	}	      
	      movePlayer(0.0, 0.1);
	      playerModel.playerLastMovement = 'DOWN';
	    }
	    if ( keys[keys.JUMP] ) {
	      jumpPlayer();
	      movePlayerStyleReset();
	      movePlayerJump();
	    }
	    if ( keys[keys.DAMMAGE] ) {
	      dammagePlayer();	      
	    }
	    if ( keys[keys.FIREBALL] ) {
	      createFireBall();
	    }
	    if ( keys[keys.SCORE] ) {
	    	playerScoreIncrease();
	    }
	    if(playerModel.playerIdle == false && !keys[keys.JUMP] && !keys[keys.DOWN] && !keys[keys.UP] && !keys[keys.RIGHT] && !keys[keys.LEFT]){
	    		playerModel.playerRunRight = false;
		        playerModel.playerRunLeft = false;
		        playerModel.playerRunUp = false;
		        playerModel.playerRunDown = false;
	    		playerModel.playerIdle = true;
	    		movePlayerStyleReset();
	    		if(playerModel.playerIdleB != true){
	    			movePlayerIdle();
	    		}else{
	    			movePlayerIdleB();
	    		}	      		
	    }
	}
};


// Player movement animation changes
let movePlayerStyleReset = function(){
	player.style.animation = '';
	player.style.width = '';
	player.style.height = '';
	player.style.backgroundImage = '';
	player.style.animation = '';
}
let movePlayerIdle = function(){
	player.style.width = 'calc(282px / 3)';
	player.style.height = '74px';
	player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoIdle_L.png")';
	player.style.animation = 'playerIdle 1s steps(3) infinite';
}
let movePlayerIdleB = function(){
	player.style.width = 'calc(282px / 3)';
	player.style.height = '74px';
	player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoIdle_L_B.png")';
	player.style.animation = 'playerIdle 1s steps(3) infinite';
}
let movePlayerRight = function(){
	player.style.width = 'calc(562px / 6)';
	player.style.height = '74px';
	player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoRunRight_L.png")';
	player.style.animation = 'playerRunRight 1s steps(6) infinite';
}
let movePlayerLeft = function(){
	player.style.width = 'calc(562px / 6)';
	player.style.height = '74px';
	player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoRunLeft_L.png")';
	player.style.animation = 'playerRunLeft 1s steps(6) infinite';
}
let movePlayerJump = function(){
	if(playerModel.playerIdleB != true){
		player.style.width = 'calc(390px / 4)';
		player.style.height = '74px';
		player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoJump_L.png")';
		player.style.animation = 'playerJump 1s steps(4) infinite';
	}else{
		player.style.width = 'calc(390px / 4)';
		player.style.height = '74px';
		player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoJump_L_B.png")';
		player.style.animation = 'playerJump 1s steps(4) infinite';
	}
}
let movePlayerDamaged = function(){
	if(playerModel.playerIdleB != true){
		player.style.width = 'calc(282px / 3)';
		player.style.height = '74px';
		player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoDammage_L.png")';
		player.style.animation = 'playerDamaged 1s steps(3) infinite';
	}else{
		player.style.width = 'calc(282px / 3)';
		player.style.height = '74px';
		player.style.backgroundImage = 'url("./includes/player/animationSheets/DinoDammage_L_B.png")';
		player.style.animation = 'playerDamaged 1s steps(3) infinite';
	}
}

let dammagePlayer = function() {
	//Checks if the player is in the invinciable state and if they arnt it will dammage them...
	if(!playerModel.playerInvincible){
		playerModel.playerHealth = playerModel.playerHealth - 1;
		movePlayerStyleReset();
		movePlayerDamaged();
		//set inv to true for 3 secconds and then back t0 false...
		playerModel.playerInvincible = true;
		setTimeout(function(){ playerModel.playerInvincible = false; }, 3000);
		//Changing player model to show the player they are invinciable....
		//Easy way to flash the player sprite without having to make a new dammaged sprite...
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 200);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 400);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 600);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 800);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 1000);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 1200);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 1400);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 1600);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 1800);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 2000);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 2200);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 2400);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 2600);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 2800);
		setTimeout(function(){ playerModel.element.style.visibility = 'hidden'; }, 3000);
		setTimeout(function(){ playerModel.element.style.visibility = 'visible'; }, 3010);
	}
}

let detectPlayerHealth = function(){	
	if(playerModel.playerHealth == 6){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart3.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")'; 
	}
	if(playerModel.playerHealth == 5){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart3.style.backgroundImage = 'url("./includes/player/health/heart_half_L.png")';
	}
	if(playerModel.playerHealth == 4){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart3.style.backgroundImage = '';
	}
	if(playerModel.playerHealth == 3){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = 'url("./includes/player/health/heart_half_L.png")';
	  heart3.style.backgroundImage = '';
	}
	if(playerModel.playerHealth == 2){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = '';
	  heart3.style.backgroundImage = '';
	}
	if(playerModel.playerHealth == 1){
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_half_L.png")';
	  heart2.style.backgroundImage = '';
	  heart3.style.backgroundImage = '';
	}
	if(playerModel.playerHealth <= 0){
	  heart1.style.backgroundImage = '';
	  heart2.style.backgroundImage = '';
	  heart3.style.backgroundImage = '';
	}
}

//Sor score inscrase
let playerScoreIncrease = function(){
	playerModel.inGameScore = playerModel.inGameScore + 1000000;
}
//for score decrease
let playerScoreDecrease = function(){
	playerModel.inGameScore = playerModel.inGameScore - 1000000;
}

//For detection of the start of the game...
let detectGameStart = function(){
	if ( keys[keys.START] ) {
	    	playerModel.playerStart = true;
	    	gameInstr.style.display='none';
	}
}

// For detection of background changes
let detectBackgroundMenu = function(){
	let menuBackground = document.getElementById('menuBackground');
}
let detectBackgroundAction = function(){

}

// For in game timers and scores and coutners
let inGameCounters = function(){	
  playerModel.inGameTime ++;
  playerModel.inGameScore ++;

  // For sending the info to the screen
  let inGameScore = document.getElementById('inGameScore');
  inGameScore.innerHTML = Math.round(playerModel.inGameScore/100);

  // For animated clouds 
  //230
  if(playerModel.inGameTime > 230 && playerModel.animatedClouds == false){
	  let frontClouds = document.getElementById('frontClouds');
	  let midClouds = document.getElementById('midClouds');
	  let codeBtn = document.getElementById('codeBtn');
	  let mainSiteBtn = document.getElementById('mainSiteBtn');
	  let resetBtn = document.getElementById('resetBtn');
	  let playerHealth = document.getElementById('playerHealth');
	  let heart1 = document.getElementById('heart1');
	  let heart2 = document.getElementById('heart2');
	  let heart3 = document.getElementById('heart3');
	  let playerScore = document.getElementById('playerScore');

	  frontClouds.style.animation = '1.5s infinite .25s slideUpDown alternate';
	  midClouds.style.animation = '1.5s infinite .75s slideUpDown alternate';
  
	  codeBtn.style.animation = '1s fadein';
	  mainSiteBtn.style.animation = '1s fadein';	  
	  resetBtn.style.animation = '1s fadein';
	  playerHealth.style.animation = '1s fadein';
	  playerScore.style.animation = '1s fadein';

	  // // Full Hearts
	  heart1.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart2.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")';
	  heart3.style.backgroundImage = 'url("./includes/player/health/heart_full_L.png")'; 

	  playerModel.animatedClouds = true;
  }else if(playerModel.inGameTime < 230){
  	movePlayer();
  }
}

// For collision detection
let detectCollision = function(){	
	// Player
	let player = document.getElementById('playerModel');
	let playerPos = player.getBoundingClientRect();

	// for ground collision
	let ground = document.getElementById('groundModel');
	let groundPos = ground.getBoundingClientRect();
	if(playerPos.bottom > groundPos.top){
		playerModel.groundCollision = true;
	}else{
		playerModel.groundCollision = false;
	}

	// for hill collision. Do not let the player leave the hill...
	let top = document.getElementById('hillBoundsTop');
	let middle1 = document.getElementById('hillBoundsMiddle1');
	let middle2 = document.getElementById('hillBoundsMiddle2');
	let middle3 = document.getElementById('hillBoundsMiddle3');
	let bottom = document.getElementById('hillBoundsBottom');

	if(doElsCollide(player, top) || doElsCollide(player, middle1) || doElsCollide(player, middle2) || doElsCollide(player, middle3) || doElsCollide(player, bottom)){
		// console.log("In the Zones");
	}else{
		// console.log("Out of zone");
		if(playerModel.playerLastMovement == 'UP'){
			movePlayer(0.0, 0.1);
		}else if(playerModel.playerLastMovement == 'DOWN'){
			movePlayer(0.0, -0.1);
		}else if(playerModel.playerLastMovement == 'LEFT'){
			movePlayer(0.1, 0.0);
		}else if(playerModel.playerLastMovement == 'RIGHT'){
			movePlayer(-.1, 0.0);
		}
	}


	// Testing collision of fireballs and player...
	let fireballs = document.getElementsByClassName('fireBalls');
	// run through all elements in array and test for player collision...
	for (fireball of fireballs){
		if(doElsCollideTop(player, fireball)){
			console.log('Fire Ball Hit');
			fireball.style.display = 'none';
			dammagePlayer();
		}
	}
}


// this will move all fireballs down untill off the screen and then remove the element.
let fireBallFalling = function(){	
	if(playerModel.fireBallAmount > 0){
		for (let i = playerModel.lastFireBallId; i < playerModel.fireBallAmount; i++) {				
			if(document.getElementById('fireBall' + i)){
			let fireBall = document.getElementById('fireBall' + i);	
			let id = fireBall.id;
			if(playerModel.fireBalls.includes(fireBall.id)){
				let top = parseInt(fireBall.style.top) + 1;	
		    	if(top <= 100){		    			    	
			    	fireBall.style.top = top + '%';
		    	}else{
		    			playerModel.lastFireBallId = i;
			    		fireBall.remove();
			    		var index = playerModel.fireBalls.indexOf(id);
						if (index > -1) {
						  playerModel.fireBalls.splice(index, 1);
						}
		    	}				
			}
			}			
		}
	}
}

//creates fireballs depending on level/amount...
 let createFireBall = function(){
 	//300
        if(playerModel.inGameTime > 300){
        if(playerModel.fireBallAmount >= 0){
        	for (let i = 0; i < playerModel.fireBallSpawnRate; i++ ) {
			let id = playerModel.fireBallAmount;
			let screen = document.getElementById('mainWrapper');
			let fireBall = document.createElement('div');
		    fireBall.style.backgroundImage = 'url("./includes/meteor/meteor.gif")';    
		    fireBall.id = 'fireBall'+id;
		    fireBall.style.top = '-1%';
		    fireBall.style.left = Math.floor(Math.random() * 100) - 10 + '%';
		    fireBall.style.height = '4%';
		    fireBall.style.width = '4%';
		    fireBall.style.backgroundSize = '100% 100%';
		    screen.appendChild(fireBall);
		    let fireBallStyle = document.getElementById('fireBall'+id);
		    fireBallStyle.className = 'fireBalls';    
		    // playerModel.fireBallCount++;
		    playerModel.fireBallAmount++;
		    playerModel.fireBalls.push(fireBall.id);
		}
        canCall = false;
        setTimeout(function(){
            canCall = true;
        }, 500);
    }
}
}


//this is to increase the amount of fireballs on the screen at one time...
//Basicly the level the players on... depending on the fireball spawn rate...
//Also shows titles for levels and title card...
let Levels = function(){
	if(playerModel.inGameTime > 250 && playerModel.inGameTime < 749){
		playerModel.fireBallSpawnRate = 1;
		if(playerModel.inGameTime > 250 && playerModel.inGameTime < 349){
					levels[1].style.display = 'inline-block';
					levels[2].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 350){
					levels[1].style.display = 'none';
					levels[2].style.display = 'none';
				}
	}else if(playerModel.inGameTime > 750 && playerModel.inGameTime < 1749){
		playerModel.fireBallSpawnRate = 2;
		playerModel.inGameScore = playerModel.inGameScore + 200;
		if(playerModel.inGameTime > 750 && playerModel.inGameTime < 849){
					levels[3].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 850){
					levels[3].style.display = 'none';
				}
	}else if(playerModel.inGameTime > 1750 && playerModel.inGameTime < 3249){
		playerModel.fireBallSpawnRate = 3;
		playerModel.inGameScore = playerModel.inGameScore + 400;
		if(playerModel.inGameTime > 1750 && playerModel.inGameTime < 1849){
					levels[4].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 1850){
					levels[4].style.display = 'none';
				}
	}else if(playerModel.inGameTime > 3250 && playerModel.inGameTime < 6249){
		playerModel.fireBallSpawnRate = 4;
		playerModel.inGameScore = playerModel.inGameScore + 800;
		if(playerModel.inGameTime > 3250 && playerModel.inGameTime < 3349){
					levels[5].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 3350){
					levels[5].style.display = 'none';
				}
	}else if(playerModel.inGameTime > 6250  && playerModel.inGameTime < 10249){
		playerModel.fireBallSpawnRate = 5;
		playerModel.inGameScore = playerModel.inGameScore + 1600;
		if(playerModel.inGameTime > 6250 && playerModel.inGameTime < 6349){
					levels[6].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 6350){
					levels[6].style.display = 'none';
				}
	}else if(playerModel.inGameTime > 10250){
		playerModel.fireBallSpawnRate = 6;
		playerModel.inGameScore = playerModel.inGameScore + 3200;
		if(playerModel.inGameTime > 10250 && playerModel.inGameTime < 10349){
					levels[7].style.display = 'inline-block';
				}else if(playerModel.inGameTime > 10350){
					levels[7].style.display = 'none';
				}
	}
}
	
// this is used for collision detection between two elements...
doElsCollide = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    
    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
};

doElsCollideTop = function(player, fireball) {

	//Checks for the fireball x and y
    fireball.offsetBottom = fireball.offsetTop + fireball.offsetHeight;
    fireball.offsetRight = fireball.offsetLeft + fireball.offsetWidth;
    //if the fireball is being hit from thwe top of the player do the collision checks. If not ignore the fireball....
	if(fireball.offsetBottom < (player.offsetTop+1)){
		player.offsetBottom = player.offsetTop + player.offsetHeight;
    	player.offsetRight = player.offsetLeft + player.offsetWidth;
	    
	    return !((player.offsetBottom < fireball.offsetTop) ||
	             (player.offsetTop > fireball.offsetBottom) ||
	             (player.offsetRight < fireball.offsetLeft) ||
	             (player.offsetLeft > fireball.offsetRight))
	}    
};


/// game loop
setInterval(function(){
	//this is for the pause at the start of the game to show instructions and movement...
	//after player presses the correct button the game will start and not be able to be paused after, unless dead...
	if(playerModel.playerStart){
		  detectPlayerMovement();
		  detectCollision();
		  fireBallFalling();
		  detectCollision();
		  detectPlayerJump();
		  detectPlayerHealth();
		  detectBackgroundMenu();
		  detectBackgroundAction();
		  inGameCounters();
		  detectCollision();
	}else if(!playerModel.playerStart){
		  detectGameStart();
	}		  
}, 1000/24);

//fireball spawn loop
setInterval(function(){
	if(playerModel.playerStart){
		createFireBall();  
		Levels();
	}else if(!playerModel.playerStart){
		  detectGameStart();
	}
}, 10500/24);

movePlayer();