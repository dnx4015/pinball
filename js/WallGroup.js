function WallGroup(gl, program, caller, callback, id){
	Group.apply(this, arguments);
	this.positions = Constants.wallsPositions;
	this.cantElements = this.positions.length;
	this.createElements();
};
WallGroup.inherits(Group);

WallGroup.method('createElements', function(){
	for(var i = 0; i < this.cantElemnts; i++){
		this.elementsLoaded = false;
		this.elements.push(new Wall(this.gl, this.program, 
									this, 'elementCreated',i));
	}
});
