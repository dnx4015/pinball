function Ball(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.ballsPosition[id];
	this.positionChanged = true;
	this.loadOBJ(Constants.ballFile);
};
Ball.inherits(RealObject);


