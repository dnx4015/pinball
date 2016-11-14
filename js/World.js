function World(gl, program, soundManager, scoreManager, caller,
				callback, id){
	this.gl = gl;
	this.program = program;
	this.soundManager = soundManager;
	this.scoreManager = scoreManager;
	this.caller = caller;
	this.callback = callback;
	this.id = id;
	
	this.table = new Table(gl, program, this, 'objectCreated',
							World.TABLE);
	this.bumpers = new BumperGroup(gl, program, this, 
									'objectCreated', 
									World.BUMPERS);
	this.kickers = new KickerGroup(gl, program, this,
									'objectCreated', 
									World.KICKERS);
	this.ballGenerator = new BallGenerator(gl, program, this, 
										'objectCreated', 
										World.BALL_GENERATOR);
	this.walls = new WallGroup(gl, program, this, 
								'objectCreated', World.WALLS);
	this.plunger = new Plunger(gl, program, this, 
								'objectCreated', World.PLUNGER);
	this.balls = new BallGroup(gl, program, this,
								'objectCreated', World.BALLS);
	this.flippers = new FlipperGroup(gl, program, this, 
									'objectCreated', 
									World.FLIPPERS);
	
	
	this.elements = [this.table, this.kickers, 
					this.ballGenerator,
					this.walls, this.plunger,
					this.balls, this.flippers];
	
	this.elementsLoaded = [false, false, false, false, false,
							false, false];

	this.dynamicElements = [this.plunger, this.balls, 
							this.flippers];

	this.viewMatrix = mat4();
}

World.TABLE = 0;
World.BUMPERS = 1;
World.KICKERS = 2;
World.BALL_GENERATOR = 3;
World.WALLS = 4;
World.PLUNGER = 5;
World.BALLS = 6;
World.FLIPPERS = 7;

World.SPACE = 32;
World.UP = 38;
World.DOWN = 40;
World.Z = 90;
World.X = 88;


World.method('objectCreated', function(which){
	this.elementsLoaded[which] = true;
	var complete = true;
	for(var i = 0; i < 8; i++){
		complete = complete && this.elementsLoaded[i];
	}
	if(complete){
		this.caller[this.callback]();
	}
});

World.method('processInput', function(currentlyPressedKeys){
	if(currentlyPressedKeys[World.SPACE]){
		this.plunger.goDown();
	}
	if(currentlyPressedKeys[World.UP]){
		this.incrementInclination();
	}
	if(currentlyPressedKeys[World.DOWN]){
		this.decrementInclination();
	}
	if(currentlyPressedKeys[World.Z]){
		this.flippers.moveLeft();
	}
	if(currentlyPressedKeys[World.X]){
		this.flippers.moveRight();
	}

});

World.method('update', function(currentlyPressedKeys){
	for(var i = 0; i < 8; i++){
		this.dynamicElements[i].updatePosition();
	}
	
	this.checkBallsCollisions();
});

World.method('checkBallsCollisions', function(){
	for(var i = 0; i < 8; i++){
	//check collision ball against each item including other balls
	}
});

World.method('draw', function(){
	for(var i = 0; i < 8; i++){
		this.elements[i].draw();
	}
});

World.method('reinit', function(){
	for(var i = 0; i < 8; i++){
		this.dynamicElements[i].reinit();
	}

});




