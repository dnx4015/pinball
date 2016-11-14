function ScoreManager(){
	this.score = 0;
	this.lifes = 3;
	this.domScore = $('#valScore');
	this.domLifes = $('#valLifes');
}

ScoreManager.method('setScore', function(score){
	this.score = score;
	this.domScore.val(this.score);
});

ScoreManager.method('setLifes', function(lifes){
	this.lifes = lifes;
	this.domLifes.val(this.lifes);
});


