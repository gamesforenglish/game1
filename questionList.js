let QuestionList = function(){
  this.init = function(game, data){
    this.game = game;
    this.data = data;
    this.questions = [];
    this.printedQuestion = 0;
    this.maxScore = 10 * this.data.length;
    this.excellent = 0.8 * 10 * this.data.length;
    this.fair = 0.5 * 10 * this.data.length;
    this.bad = 0.3 * 10 * this.data.length;
    console.log(this.excellent + " " + this.fair + " " + this.bad);
    for(let i=0; i<this.data.length; i++){
      let tmpQuestion = new Question();
      tmpQuestion.init(this.game, this, this.data[i]);
      this.questions.push(tmpQuestion);
    }
  }

  this.draw = function(){
    this.questions[this.printedQuestion].draw();
    if(this.printedQuestion == this.data.length){
      this.game.done = true;
    }
  }
}