function Group(gl, program, caller, callback, id){
	this.gl = gl;
	this.program = program;
	this.caller = caller;
	this.callback = callback;
	this.id = id;
	this.positions = [];
	this.cantElements = this.positions.length;
	this.elements = [];
	this.elementsLoaded = [];
};

Group.method('elementCreated', function(which){
	this.elementsLoaded[which] = true;
	var complete = true;
	for(var i = 0; i < this.cantElements; i++){
		complete = complete && this.elementsLoaded[i];
	}
	if(complete){
		this.caller[this.callback](this.id);
	}
});

Group.method('draw', function(){
	for(var i = 0; i < this.cantElements; i++){
		this.elements[i].draw();
	}
});

