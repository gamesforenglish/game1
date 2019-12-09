var Sound = function(){
  this.init = function(src, isLooped, volume){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("control","none");
    this.sound.style.display = "none";

    
    this.sound.loop = isLooped;
    

    if(volume == undefined){
      this.sound.volume = 1;
    }
    else{
      this.sound.volume = volume;
    }

    document.body.appendChild(this.sound);
  }

  this.play = function(){
    this.sound.play();
  }

  this.stop = function(){
    this.sound.pause();
  }
}