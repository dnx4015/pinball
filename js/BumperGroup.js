function BumperGroup(gl, program, caller, callback, id){
	Group.apply(this, arguments);
	this.positions = Constants.bumpersPositions;
	this.cantElements = this.positions.length;
	this.createElements();
};
BumperGroup.inherits(Group);

BumperGroup.method('createElements', function(){
	for(var i = 0; i < this.cantElemnts; i++){
		this.elementsLoaded = false;
		this.elements.push(new Bumper(this.gl, this.program, 
									this, 'elementCreated',i));
	}
});
