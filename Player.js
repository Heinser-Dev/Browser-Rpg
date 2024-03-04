class Player {
  constructor(config, database, playerId){
	this.playerId = playerId;
    this.x = config.x || Math.floor(Math.random() * 10);
    this.y = config.y || Math.floor(Math.random() * 10);
	this.color = config.color || "#3d3d3d";
	this.database = database;
  }
  
  update(x, y){
	this.x += x;
	this.y += y;
	
	// Atualize a posição do jogador no banco de dados em tempo real
    this.database.ref('players/' + this.playerId).set({
      x: this.x,
      y: this.y,
	  color: this.color
    });
  }
  
  draw(ctx, players){
	  ctx.clearRect(0, 0, 11, 11);
	  
	  for (let playerId in players) {
        const player = players[playerId];
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 1, 1);
      }
  }
}
