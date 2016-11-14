function KickerGroup(gl, program, caller, callback, id){
	Group.apply(this, arguments);
	this.positions = Constants.kickersPositions;
	this.cantElements = this.positions.length;
	this.createElements();
};
KickerGroup.inherits(Group);

KickerGroup.method('createElements', function(){
	for(var i = 0; i < this.cantElemnts; i++){
		this.elementsLoaded = false;
		this.elements.push(new Kicker(this.gl, this.program, 
									this, 'elementCreated',i));
	}
});
