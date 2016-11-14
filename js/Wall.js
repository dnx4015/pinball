function Wall(gl, program, caller, callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.wallsPosition[id];
	this.positionChanged = true;
	this.loadOBJ(Constants.wallsFile[id]);
};
Wall.inherits(RealObject);


