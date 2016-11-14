function CameraManager(gl, program){
	this.gl = gl;
	this.program = program;
	this.eye = Constants.cameraPosition;
	this.at = vec3();
	this.up = vec3(0, 1, 0);
	this.projectionMatrix = mat4();
}

CameraManager.method('resizeCanvas', function(){
	var gl = this.gl;
	var program = this.program;
	//look at?
	this.projectionMatrix = 
		perspective(45, gl.viewportWidth / gl.viewportHeight, 
					0.1, 100.0);
	gl.uniformMatrix4fv(program.uPMatrix, false, 
						flatten(this.projectionMatrix));
	
});
