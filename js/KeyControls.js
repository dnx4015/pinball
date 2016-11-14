function KeyControls(game){
	this.game = game;
	this.date = new Date();
	var me = this;	
	$(document).keydown(function(e){
		me.keyDown(e);
		e.preventDefault();
		return false;
	});	
	
	$(document).keyup(function(e){
		me.keyUp(e);
		e.preventDefault();
		return false;
	});	
}

KeyControls.method('keyDown', function (e){
	this.game.keyDown(e.keyCode);
});

KeyControls.method('keyUp', function (e){
	this.game.keyUp(e.keyCode);	
});



