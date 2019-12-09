let Background = function(){
  let self = this;
  
  this.init = function(game, width, height, bgPath){
    this.game = game;
    this.width = width;
    this.height = height;
    this.bgPath = bgPath;

    this.bgImg = new Image();
    this.bgImg.src = this.bgPath;
    this.bgImg.onload = function(){
      self.loaded = true;
    }
  }


  this.draw = function(){
    if(this.loaded){
      this.game.ctx.drawImage(this.bgImg, this.game.x, this.game.y, this.width, this.height);
    }
  }
}