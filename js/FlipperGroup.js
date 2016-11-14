function FlipperGroup(gl, program, caller, callback, id){
	Group.apply(this, arguments);
	this.positions = Constants.flippersPositions;
	this.cantElements = this.positions.length;
	this.createElements();
};
FlipperGroup.inherits(Group);

FlipperGroup.method('createElements', function(){
	for(var i = 0; i < this.cantElemnts; i++){
		this.elementsLoaded = false;
		this.elements.push(new Flipper(this.gl, this.program, 
									this, 'elementCreated',i));
	}
});
