function Table(gl, program, caller,callback, id){
	RealObject.apply(this, arguments);
	this.position = Constants.tablePosition;
	this.positionChanged = true;
	this.loadOBJ(Constants.tableFile);
};
Table.inherits(RealObject);


