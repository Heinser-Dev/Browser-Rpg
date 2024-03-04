class Overworld {
  constructor(config) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ground = new Image();
	this.ground.src = "ground.png";
	this.ground.onload = ()=>{
		this.ctx.drawImage(this.ground, 0, 0);
	}
	
	this.characters = new Image();
	this.characters.src = "characters.png";
	this.characters.onload = ()=>{
		this.charactersLoaded = true;
	}
  }

  init() {
	  
	  const hero = new GameObject({
		srcX: 2,
		srcY: 303,
		src: "characters.png"
	  })
	  console.log(hero)
	  hero.draw(this.ctx);
  }
}