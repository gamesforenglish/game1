let Question = function(){
  this.init = function(game, questionList, piecesContent){
    this.game = game;
    this.questionList = questionList;
    this.nPieces = piecesContent.length;
    this.piecesList = [];
    this.keyList = [];  
    

    this.piecesContent = piecesContent;
    this.ans = [];
    for(let i=0; i<this.nPieces; i++){
      this.ans.push("");
    }
    this.key = piecesContent;

    let tmp = [];
    for (let i=0;i<this.nPieces;++i) tmp[i]=i;
    tmp = this.shuffle(tmp);

    this.printedPiecesContent = [];
    for(let i = 0; i<this.nPieces; i++){
      this.printedPiecesContent.push(this.piecesContent[tmp[i]]);
    }

    if(this.piecesContent.length == 3){
      let mg = 30;
      let qsw = 730/3;
      let qsh = 400;

      this.pos = [
        {x: mg + qsw/2, y: qsh}, 
        {x: mg + qsw/2 + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw, y: qsh}
      ];

      this.keyPos = [
        {x:mg + 365-150, y: 110, isFree: true, alongWith: -1}, 
        {x:mg + 365, y: 110, isFree: true, alongWith: -1}, 
        {x:mg + 365+150, y:110, isFree: true, alongWith: -1}
      ];
    }
    
    if(this.piecesContent.length == 4){
      let mg = 30;
      let qsw = 730/4;
      let qsh = 400;
      
      this.pos = [
        {x: mg + qsw/2, y: qsh}, 
        {x: mg + qsw/2 + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw + qsw, y: qsh}
      ];

      this.keyPos = [
        {x:mg + 365-75-150, y: 110, isFree: true, alongWith: -1}, 
        {x:mg + 365-75, y: 110, isFree: true, alongWith: -1}, 
        {x:mg + 365+75, y:110, isFree: true, alongWith: -1},
        {x:mg + 365+75+150, y:110, isFree: true, alongWith: -1}
      ];
    }

    if(this.piecesContent.length == 5){
      let mg = 30;
      let qsw = 730/5;
      let qsh = 400;
      
      this.pos = [
        {x: mg + qsw/2, y: qsh}, 
        {x: mg + qsw/2 + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw + qsw, y: qsh},
        {x: mg + qsw/2 + qsw + qsw + qsw + qsw, y: qsh}
      ];

      this.keyPos = [
        {x: mg + qsw/2, y: 110, isFree: true, alongWith: -1}, 
        {x: mg + qsw/2 + qsw, y: 110, isFree: true, alongWith: -1},
        {x: mg + qsw/2 + qsw + qsw, y: 110, isFree: true, alongWith: -1},
        {x: mg + qsw/2 + qsw + qsw + qsw, y: 110, isFree: true, alongWith: -1},
        {x: mg + qsw/2 + qsw + qsw + qsw + qsw, y: 110, isFree: true, alongWith: -1}
      ];
    }
    

    for(let i = 0; i<this.nPieces; i++){
      let tmpPiece = new Piece();
      tmpPiece.init(this.game, 125, 125, this.pos[i].x, this.pos[i].y, "images/noteimage1.png", this.printedPiecesContent[i]);
      this.piecesList.push(tmpPiece);
    }

    for (let i=0; i < this.nPieces; i++){
      let tmpPieceA = new Piece();
      tmpPieceA.init(this.game, 125, 125, this.keyPos[i].x, this.keyPos[i].y, "images/noteimage2.png", this.printedPiecesContent[i]);
      this.keyList.push(tmpPieceA);
    }

    this.correctSound = new Sound();
    this.correctSound.init("sounds/correct_sound.mp3", false);

    this.incorrectSound = new Sound();
    this.incorrectSound.init("sounds/incorrect_sound.wav", false);

    this.clickSound = new Sound();
    this.clickSound.init("sounds/piece_on_click.mp3", false, 0.3);
  }


  this.getFirstFreePos = function(){
    for(let i = 0; i<this.keyPos.length; i++){
      if(this.keyPos[i].isFree == true){
        return i;
      }
    }
  }


  this.getFirstFreePosAns = function(){
    for(let i = 0; i<this.ans.length; i++){
      if(this.ans[i] == ""){
        return i;
      }
    }
  }


  this.checkEmptyAns = function(){
    for(let i=0; i<this.ans.length; i++){
      if(this.ans[i] == ""){
        return true;
      }
    }
    return false;
  }


  this.shuffle = function (array) {
    let tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }


  this.check = function(){
    return JSON.stringify(this.ans) == JSON.stringify(this.key);
  }


  this.draw = function(){
    for(let i = 0; i < this.piecesList.length; i ++){
      this.piecesList[i].draw();
    }
    
    for(let i = 0; i<this.piecesList.length; i++){
      if(this.piecesList[i].isClicked == true){
        // this.clickSound.play();
        if(!this.keyList[i].isDraw){
          let firstFreePos = this.getFirstFreePos(this.keyPos);
          let newPos = this.keyPos[firstFreePos];        
          this.keyList[i].setPos(newPos.x, newPos.y);
          this.keyPos[firstFreePos].isFree = false;
          this.keyPos[firstFreePos].alongWith = i;
          this.keyList[i].isDraw = true;
          let idx = this.getFirstFreePosAns();
          this.ans[idx] = this.piecesList[i].content;
        }
      }
    }

    for(let i = 0; i<this.keyList.length; i++){
      if(this.keyList[i].isDraw == true){
        this.keyList[i].draw();
      }
    }

    for(let i = 0; i<this.keyList.length; i++){
      if(this.keyList[i].isClicked){
        this.keyList[i].isDraw = false;

        for(let j = 0; j<this.keyPos.length; j++){
          if(this.keyPos[j].alongWith == i){
            this.keyPos[j].alongWith = -1;
            this.keyPos[j].isFree = true;
            this.ans[j] = "";
          }
        }
      }
    }

    if(this.game.submitButton.isClicked){
      if(!this.checkEmptyAns()){
        if(this.check()){
          this.game.score += 10;
          this.correctSound.play();
        }
        else{
          this.game.score += 0;
          this.incorrectSound.play();
        }
        this.questionList.printedQuestion++;
      }
    }
  }

  
}