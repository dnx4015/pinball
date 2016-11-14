function Kicker(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.kickersPosition[id];
	this.positionChanged = true;
	this.loadOBJ(Constants.kickerFile);
};
Kicker.inherits(RealObject);

