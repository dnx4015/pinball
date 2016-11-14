function Plunger(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.plungerPosition;
	this.positionChanged = true;
	this.loadOBJ(Constants.plungerFile);};
Plunger.inherits(RealObject);


