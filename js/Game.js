function Game(){
	this.canvas = document.getElementById('gl-canvas');
	this.gl = WebGLUtils.setupWebGL(this.canvas);
	if (!this.gl) {
		alert("Could not initialise WebGL, sorry :-(");
		return;
	}
	
	this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	
	this.program = initShaders(this.gl, 
							'vertex-shader', 'fragment-shader');
	this.gl.useProgram(this.program);
	this.setProgramVariables();
	this.lightManager = new LightManager(this.gl, this.program);//lightPosition, lightcolors
	this.cameraManager = new CameraManager(this.gl, this.program);//projectionMatrix
	this.soundManager = new SoundManager();//sound effects
	this.scoreManager = new ScoreManager();//score
	this.skybox = new SkyBox(this.gl, this.program, this, 'start', 
							Game.SKYBOX);//different viewMatrix
	/*this.world = new World(this.gl, this.program, 
							this.soundManager, this.scoreManager,
							this, 'start', Game.WORLD);//viewMatrix
							*/
	this.skyBoxLoaded = false;
	this.worldLoaded = false;

	this.state = Game.NOT_INITIATED;

	var me = this;
	$(window).resize(function(){
		me.resizeCanvas();
		console.log('resized');
	});
	this.resizeCanvas();

	this.currentlyPressedKeys = {}
}

Game.NOT_INITIATED = 0;
Game.PLAYING = 1;
Game.PAUSED = 2;
Game.FINISHED = 3;

Game.SKYBOX = 0;
Game.WORLD = 1;

Game.method('resizeCanvas', function(){
	var windowWidth = window.innerWidth;
    var headerHeight = $("#divHeader").outerHeight();
    var footerHeight = $("#divFooter").outerHeight();
	var windowHeight = window.innerHeight - footerHeight - headerHeight;

	this.gl.canvas.width = windowWidth;
	this.gl.canvas.height = windowHeight;
	this.gl.viewportWidth = windowWidth;
	this.gl.viewportHeight = windowHeight;
    this.gl.viewport(0, 0, windowWidth, windowHeight);
	this.cameraManager.resizeCanvas();
});

Game.method('setProgramVariables', function(){
	var gl = this.gl;
	var program = this.program;
	
	program.vPosition = gl.getAttribLocation(program, 
												"vPosition");
    gl.enableVertexAttribArray(program.vPosition);
	
	program.vTextureCoord = gl.getAttribLocation(program, 
												"vTextCoord");
    gl.enableVertexAttribArray(program.vTextCoord);	
	program.vNormal = gl.getAttribLocation(program, 
											"vNormal");
    gl.enableVertexAttribArray(program.vNormal);
	
	program.uMMatrix = gl.getUniformLocation(program, 'uMMatrix');
	program.uVMatrix = gl.getUniformLocation(program, 'uVMatrix');
	program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
	program.uNMatrix = gl.getUniformLocation(program, 'uNMatrix');
	
	program.ns = gl.getUniformLocation(program, 'uShininess');
	program.ka = gl.getUniformLocation(program, 'uKa');
	program.kd = gl.getUniformLocation(program, 'uKd');
	program.ks = gl.getUniformLocation(program, 'uKs');
	
	program.lightPosition = gl.getUniformLocation(program, 
												'lightPosition');
	program.lightStrength = gl.getUniformLocation(program, 
												'uLightStrength');
	program.ia = gl.getUniformLocation(program, 'uIa');
	program.id = gl.getUniformLocation(program, 'uId');
	program.is = gl.getUniformLocation(program, 'uIs');

	program.uSampler = gl.getUniformLocation(program, 'uSampler');
});

Game.method('start', function(which){
	switch( which ){
		case Game.SKYBOX:
			this.skyBoxLoaded = true;
			break;
		case Game.WORLD:
			this.worldLoaded = true;
			break;
	}
	if(this.skyBoxLoaded/* && this.worldLoaded*/){
		this.play();
		this.run();
	}	
});


Game.method('run', function(){
	if (this.state === Game.PLAYING ){
		this.processInput();
		this.update();
		this.draw();
	}
	var me = this;
	requestAnimFrame(function(){
		me.run();
	});	
});

Game.method('processInput', function(){
	if(this.world){
		this.world.processInput(this.currentlyPressedKeys);
	}
});

Game.method('update', function(){
	if(this.world){
		var gameFinished = this.world.update();
	}
	if(gameFinished){
		this.state = Game.FINISHED;
	}
});

Game.method('draw', function(){
	var gl = this.gl;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	this.lightManager.draw();
	this.skybox.draw();
	if(this.world){
		this.world.draw();
	}
});

Game.method('pause', function(){
	this.state = Game.PAUSED;
});

Game.method('play', function(){
	this.state = Game.PLAYING;
});

Game.method('reinit', function(){
	this.world.reinit();
	this.scoreManager.reinit();
});

Game.method('mute', function(){
	this.soundManager.mute();
});

Game.method('unmute', function(){
	this.soundManager.unmute();
});

Game.method('keyDown', function(keyCode){
	this.currentlyPressedKeys[keyCode] = true;
});

Game.method('keyUp', function(keyCode){
	this.currentlyPressedKeys[keyCode] = false;
});

