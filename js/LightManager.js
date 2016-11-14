function LightManager (gl, program) {
	this.gl = gl;
	this.program = program;
	this.active = true;
	this.strength = 0.8;
	this.ia = vec3();
	this.id = vec3();
	this.is = vec3();
	this.ambientColor = [ 0, 128, 255, 0.3 ];
	this.diffuseColor = [ 0, 128, 255, 0.3 ];
	this.specularColor = [ 0, 128, 255, 0.3 ];
	this.position = Constants.lightPosition;
};

LightManager.method('draw', function(){
	this.getLightColors();
	var gl = this.gl;
	var program = this.program;
	
	gl.uniform3fv(program.lightPosition, this.position);
	gl.uniform1f(program.lightStrength, this.strength);
	gl.uniform3fv(program.ia, this.ia);
	gl.uniform3fv(program.id, this.id);
	gl.uniform3fv(program.is, this.is);
});

LightManager.method('getLightColors', function(){
	this.ia = flatten(this.toFloatColor(vec3(this.ambientColor)));
	this.id = flatten(this.toFloatColor(vec3(this.diffuseColor)));
	this.is = flatten(this.toFloatColor(vec3(this.specularColor)));
});

LightManager.method('toFloatColor', function(color){
	for(var i = 0; i < 3; i++){
		color[i] /= 255;
	}
	return color;
});

