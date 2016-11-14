function Bumper(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.bumpersPosition[id];
	this.positionChanged = true;
	this.loadOBJ(Constants.bumperFile);
};
Bumper.inherits(RealObject);

