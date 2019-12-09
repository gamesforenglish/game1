let Piece = function(){
  let self = this;

  this.init = function(game, width, height, x, y, backgroundPath, content, fontColor, fontSize, fontName){
    this.game = game;
    this.width = width;
    this.height = height;
    
    if(fontColor != undefined){
      this.fontColor = fontColor;
    }
    else{
      this.fontColor = "";
    }

    if(fontSize != undefined){
      this.fontSize = fontSize;
    }
    else{
      this.fontSize = "";
    }
    
    if(fontName != undefined){
      this.fontName = fontName;
    }
    else{
      this.fontName = "";
    }
    
    this.x = x;
    this.y = y;
    this.backgroundPath = backgroundPath;
    this.content = content;
    this.isDraw = false;

    this.bgImg = new Image();
    this.bgImg.src = this.backgroundPath;
    this.bgImg.onload = function(){
      self.loaded = true;
    }

    this.clickSound = new Sound();
    this.clickSound.init("sounds/piece_on_click.mp3", false, 0.3);
  }


  this.setPos = function(newX, newY){
    this.x = newX;
    this.y = newY;
  }


  this.draw = function(){
    this.game.ctx.shadowColor = "black";
    this.game.ctx.shadowBlur = 6;
    this.game.ctx.shadowOffsetX = 4;
    this.game.ctx.shadowOffsetY = 4;

    if(this.loaded == true){
      let newX = this.x-this.width/2;
      let newY = this.y-this.height/2;
      this.game.ctx.drawImage(this.bgImg, newX, newY, this.width, this.height);
    }
    this.game.ctx.shadowColor = "blue";
    this.game.ctx.shadowBlur = 0;
    this.game.ctx.shadowOffsetX = 0;
    this.game.ctx.shadowOffsetY = 0;

    let ctxFont = "";

    if(this.fontSize != ""){
      ctxFont += this.fontSize + " ";
    }
    else{
      ctxFont += "26px ";
    }

    if(this.fontName != ""){
      ctxFont += fontName;
    }
    else{
      ctxFont += "Comic Sans MS";
    }

    if(this.fontColor != ""){
      this.game.ctx.fillStyle = this.fontColor;
    }
    else{
      this.game.ctx.fillStyle = "black";
    }
    
    this.game.ctx.font = ctxFont;
    this.game.ctx.textAlign = "center";
    this.game.ctx.fillText(this.content, this.x, this.y);
  }


  document.addEventListener('mousedown', function(e) {
    console.log(e.clientX + " " + e.clientY);
    
    ///////////////////////////////
    let newX = self.x-self.width/2;
    let newY = self.y-self.height/2;
    ///////////////////////////////

    if(e.clientX >= newX && e.clientX <= newX + self.width){
      if(e.clientY >= newY && e.clientY <= newY + self.height){
        self.clickSound.play();
        self.isClicked = true;
      }
    }
  });

  document.addEventListener('mouseup', function(e) {
    let newX = self.x-self.width/2;
    let newY = self.y-self.height/2;

    if(e.clientX >= newX && e.clientX <= newX + self.width){
      if(e.clientY >= newY && e.clientY <= newY + self.height){
        self.isClicked = false;
      }
    }
  });
}