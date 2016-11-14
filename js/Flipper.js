function Flipper(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.flippersPosition[id];
	this.positionChanged = true;
	this.loadOBJ(Constants.flipperFile);
};
Flipper.inherits(RealObject);


