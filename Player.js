class Player {
  constructor(config, database, playerId){
	this.playerId = playerId;
    this.x = config.x || 0;
    this.y = config.y || 0;
	this.color = config.color || "#00BA3EFF";
    this.cameraX = this.x - Math.floor(468 / 2);
    this.cameraY = this.y - Math.floor(234 / 2);
	this.nickname = config.nickname|| "Guest#73289";
	this.speed = config.speed || 1000;
	this.moving = false;
	this.img = {
		x: config.img.x  || 2,
		y: config.img.y || 303
	};
	this.database = database;
	this.animationCounter = 0;
	this.animationTime = 1000;
	
	// Iniciar animação
	this.animation = setInterval(()=>{
		if(this.animationCounter === 1){
			this.animationCounter--;
			this.img.y -= 26;
		}else{
			this.animationCounter++;
			this.img.y += 26;
		}
		
		this.database.ref('players/' + this.playerId).update({
			imgY: this.img.y,
		})
	}, this.animationTime);
  }
  
  update(x, y){
	this.x += x;
	this.y += y;
	
	this.cameraX = this.x - Math.floor(468 / 2);
	this.cameraY = this.y - Math.floor(234 / 2);
	
	// Atualize a posição do jogador no banco de dados em tempo real
    this.database.ref('players/' + this.playerId).update({
      x: this.x,
      y: this.y
    });
  }
  
  move(direction){
	this.moving = true;
	let moveX = 0;
    let moveY = 0;
	let counter = 26;

    switch (direction) {
      case "Up":
        moveY = -1;
        break;
      case "Down":
        moveY = 1;
        break;
      case "Left":
        moveX = -1;
        break;
      case "Right":
        moveX = 1;
        break;
      default:
        break;
    }

    // Movimenta o jogador com base na velocidade
    const initMove = setInterval(() => {
		if(counter == 0){
			clearInterval(initMove);
		    this.animationTime = 1000;
			this.moving = false;
		}else{
			this.update(moveX, moveY);
			counter--;
		}
    }, this.speed / 26);
  }
}
