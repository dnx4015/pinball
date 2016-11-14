function BallGroup(gl, program, caller, callback, id){
	Group.apply(this, arguments);
	this.positions = Constants.ballsPositions;
	this.cantElements = this.positions.length;
	this.createElements();
};
BallGroup.inherits(Group);

BallGroup.method('createElements', function(){
	for(var i = 0; i < this.cantElemnts; i++){
		this.elementsLoaded = false;
		this.elements.push(new Ball(this.gl, this.program, 
									this, 'elementCreated',i));
	}
});

