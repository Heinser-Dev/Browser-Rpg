class GameObject{
  constructor(config){
    this.x = config.x || 0;
	this.y = config.y || 0;
	this.direction = config.direction || 0; // 0 é parado, 1 é para direita, 2 é para esquerda
	this.sprite = new Sprite({
		srcX: config.srcX,
		srcY: config.srcY,
		src: config.src,
		gameObject: this
	});
  }
  
  draw(ctx) {
    this.sprite.draw(ctx);
  }
}