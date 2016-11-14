function SkyBox(gl, program, caller, callback, id){
	DrawableObject.apply(this, arguments);
	this.position = Constants.skyboxPosition;
	this.positionChanged = true;
	this.loadOBJ(Constants.skyboxFile);
};
SkyBox.inherits(DrawableObject);

SkyBox.method('setPosition', function(position){
	position = (position === undefined) ? 
					this.position : 
					position;
	if(!equal(this.position, position)){
		this.positionChanged = true;
	}
});

SkyBox.method('draw', function(){
	if(this.positionChanged){
		this.updateModelMatrix();
	}
	this.uber('draw');
	this.positionChanged = false;
});

SkyBox.method('updateModelMatrix', function(){
	this.modelMatrix = mat4();
	this.modelMatrix = mult(this.modelMatrix, 
		translate(0,0,-15));
/*	this.modelMatrix = mult(this.modelMatrix,
		rotate(90, vec3(1,0,0)));
/*	this.modelMatrix = mult(this.modelMatrix,
		rotate(15, vec3(1,0,0)));*/
	this.modelMatrix = mult(this.modelMatrix,
		scaleMatrix(3,3,3));

});

