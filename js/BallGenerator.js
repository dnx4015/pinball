function BallGenerator(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.ballGeneratorPosition;
	this.positionChanged = true;
	this.loadOBJ(Constants.ballGeneratorFile);
};
BallGenerator.inherits(RealObject);

