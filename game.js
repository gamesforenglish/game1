let Game = function(){
  let self = this;

  this.init = function(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.launch = false;
    this.done = false;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = "2px solid black"
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    
    this.ctx = this.canvas.getContext("2d");
    
    this.background = new Background();
    this.background.init(this, this.width, this.height, "images/bg5.png");  ////

    this.startFrame = new Background();
    this.startFrame.init(this, this.width, this.height, "images/start.png");

    this.endFrame = new Background();
    this.endFrame.init(this, this.width, this.height, "images/endGame.png");

    this.questions = new QuestionList();
    $.get('https://api-for-game.herokuapp.com/', (res) => {
      this.questions.init(this, res.questions);
    });

    this.submitButton = new Piece();
    this.submitButton.init(this, 100, 55, 406, 255, "images/submitbutton.png", "");

    this.startButton = new Piece();
    this.startButton.init(this, 200, 110, 516, 391, "images/startButton.png", "");
    
    this.scorePiece = new Piece();
    this.scorePiece.init(this, 50, 50, 900, 145, "", "", "white");

    this.nQuestionPiece = new Piece();
    this.nQuestionPiece.init(this, 50, 50, 904, 244, "", "", "white");
    
    this.comment = new Piece();

    this.bgMusic = new Sound();
    this.bgMusic.init("sounds/theme_song.mp3", true, 1);

    this.clickSound = new Sound();
    this.clickSound.init("sounds/piece_on_click.mp3", false, 1);
  }


  this.update = function(){
    if(self.launch && !self.done){
      self.background.draw();
      self.questions.draw();
      self.scorePiece.content = self.score + "";
      self.scorePiece.draw();
      self.nQuestionPiece.content = self.questions.printedQuestion+1 + "/" + self.questions.data.length;
      self.nQuestionPiece.draw();
      self.submitButton.draw();
    }
    else{
      self.startFrame.draw();
      self.startButton.draw();
      if(self.startButton.isClicked){
        self.launch = true;
	      self.bgMusic.play();
      }
    }

    if(self.done){
      self.scorePiece.x = 537;
      self.scorePiece.y = 160;
      self.scorePiece.content = self.score + "/" + self.questions.maxScore;
      self.endFrame.draw();
      self.scorePiece.draw();

      if(self.score >= self.questions.excellent){
        self.comment.init(self, 50, 50, 700, 214, "", "Excellent", "white", 30);
      }
      else if(self.score >=self.questions.bad && self.score <self.questions.excellent){
        self.comment.init(self, 50, 50, 587, 251, "", "You did well, try to do better next time!", "white", 30);      
      }
      else {
        self.comment.init(self, 50, 50, 540, 251, "", "Practice, practice and practice...!", "white", 30);
      }
      self.comment.draw();
    }
  }
}




let myGame = new Game();
myGame.init(0, 0, 1000, 600);
setInterval(myGame.update, 100);
