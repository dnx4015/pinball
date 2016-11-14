function RealObject (gl, program, caller, callback, id){
	DrawableObject.apply(this, arguments);
	this.position = vec3();
	this.velocity = vec3();
	this.aceleration = vec3();
	this.positionChanged = false;
	this.rotation = vec3();
	this.rotationChanged = false;
}
RealObject.inherits(DrawableObject);

RealObject.method('setPosition', function(position){
	position = (position === undefined) ? 
					this.position : 
					position;
	if(!equal(this.position, position)){
		this.positionChanged = true;
	}
});

RealObject.method('setRotation', function(rotation){
	rotation = (rotation === undefined) ? 
					this.rotation : 
					rotation;
	if(!equal(this.rotation, rotation)){
		this.rotationChanged = true;
	}
});


RealObject.method('draw', function(){
	if(this.positionChanged || this.rotationChanged){
		this.updateModelMatrix();
	}
	this.uber('draw');
	this.positionChanged = false;
});

RealObject.method('updateModelMatrix', function(){
	this.modelMatrix = mat4();
	this.modelMatrix = mult(this.modelMatrix, 
		translate(this.position));
	this.modelMatrix = mult(this.modelMatrix,
		rotate(this.rotation[0], vec3(1,0,0)));
	this.modelMatrix = mult(this.modelMatrix,
		rotate(this.rotation[1], vec3(0,1,0)));
	this.modelMatrix = mult(this.modelMatrix,
		rotate(this.rotation[2], vec3(0,0,1)));
});

