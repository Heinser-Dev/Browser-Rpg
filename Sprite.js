class Sprite {
  constructor(config){
    this.srcX = config.srcX;
	this.srcY = config.srcY;
	this.img = new Image();
	this.img.src = config.src;
	this.img.onload = ()=>{
		this.isLoaded = true;
	}
	
	this.gameObject = config.gameObject;
  }
  
  draw(ctx){
	  this.isLoaded && ctx.drawImage(
	    this.img, 
	    2, 303, 
	    26, 26,
	    26, 26,
	    26, 26
	  );
  }
}