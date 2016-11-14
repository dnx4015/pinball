function DrawableObject(gl, program, caller, callback, id){
	this.gl = gl;
	this.program = program;
	this.caller = caller;
	this.callback = callback;
	this.objectOBJ = new ObjectOBJ();
	this.id = id;

	this.vertices = [];
	this.textureCoords = []
	this.normals = [];
	this.indices = [];

	this.vertexBuffer = null;
	this.textureCoordBuffer = null;
	this.normalBuffer = null;
	this.indexBuffer = null;

	this.textureFilePath = '';
	this.textureImage = null;
	this.texture = null;
		
	this.ns = 0;
	this.ka = [];
	this.kd = [];
	this.ks = [];

	this.modelMatrix = mat4();
	this.viewMatrix = mat4();
}

DrawableObject.method('loadOBJ', function(fileName){
	this.objectOBJ.readFile(fileName, this, 'setOBJParameters');
});


DrawableObject.method('setOBJParameters', function(){
	if(this.objectOBJ.complete){
		this.vertices = this.objectOBJ.vertices;
		this.textureCoords = this.objectOBJ.textureCoords;
		this.normals = this.objectOBJ.normals;
		this.indices = this.objectOBJ.indices;

		this.ns = this.objectOBJ.ns;
		this.ka = this.objectOBJ.ka;
		this.kd = this.objectOBJ.kd;
		this.ks = this.objectOBJ.ks;

		this.textureFilePath = this.objectOBJ.textureFilePath;
		this.initiateBuffers();
		this.loadTexture();
	}
});

DrawableObject.method('initiateBuffers', function(){
	var gl = this.gl;
	var program = this.program;
	
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), 
					gl.STATIC_DRAW);
	this.vertexBuffer.itemSize = 3;
	this.vertexBuffer.dataLength = this.vertices.length;
	this.vertexBuffer.numItems = 
		this.vertexBuffer.dataLength / this.vertexBuffer.itemSize;

	this.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(this.textureCoords), 
					gl.STATIC_DRAW);
	this.textureCoordBuffer.itemSize = 2;
	this.textureCoordBuffer.dataLength = this.textureCoords.length;
	this.textureCoordBuffer.numItems = 
		this.textureCoordBuffer.dataLength / 
		this.textureCoordBuffer.itemSize;

	this.normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), 
					gl.STATIC_DRAW);
	this.normalBuffer.itemSize = 3;
	this.normalBuffer.dataLength = this.normals.length;
	this.normalBuffer.numItems = 
		this.normalBuffer.dataLength / this.normalBuffer.itemSize;

	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
					new Uint16Array(this.indices), gl.STATIC_DRAW);
	this.indexBuffer.itemSize = 1;
	this.indexBuffer.dataLength = this.indices.length
	this.indexBuffer.numItems = 
		this.indexBuffer.dataLength / this.indexBuffer.itemSize;
		
});

DrawableObject.method('loadTexture', function(){
	var gl = this.gl;
	
	this.texture = gl.createTexture();
	this.texture.image = new Image();
	var me = this;
	this.texture.image.onload = function (){
		me.handleLoadedTexture();
		me.caller[me.callback](me.id);
	}
	this.texture.image.src = this.textureFilePath;
});

DrawableObject.method('handleLoadedTexture', function(){
	var gl = this.gl;
	
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, 
					gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, 
					gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
					gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, 
					gl.LINEAR);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, 
					gl.UNSIGNED_BYTE, this.texture.image);

});

DrawableObject.method('setViewMatrix', function(viewMatrix){
	this.viewMatrix = viewMatrix;
});

DrawableObject.method('draw', function(){
	var gl = this.gl;
	var program = this.program;

	this.setMatrixUniforms();
	this.setIluminationUniforms();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.vertexAttribPointer(program.vPosition, 
							this.vertexBuffer.itemSize, 
							gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	gl.vertexAttribPointer(program.vTextureCoord, 
							this.textureCoordBuffer.itemSize, 
							gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	gl.vertexAttribPointer(program.vNormal, 
							this.normalBuffer.itemSize, 
							gl.FLOAT, false, 0, 0);

//	this.handleLoadedTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(program.uSampler, 0);


	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, 
					gl.UNSIGNED_SHORT, 0);	
});


DrawableObject.method('setMatrixUniforms', function(){
	var gl = this.gl;
	var program = this.program;
	
	gl.uniformMatrix4fv(program.uMMatrix, false, 
		flatten(this.modelMatrix));
	
	gl.uniformMatrix4fv(program.uVMatrix, false, 
		flatten(this.viewMatrix));

	var mvMatrix = flatten(mult(
					this.modelMatrix, this.viewMatrix));
	var normalMatrix = mat3GL.create();
	mat4GL.toInverseMat3(mvMatrix, normalMatrix);
	mat3GL.transpose(normalMatrix);
	gl.uniformMatrix3fv(program.uNMatrix, false,
		normalMatrix);
});

DrawableObject.method('setIluminationUniforms', function(){
	var gl = this.gl;
	var program = this.program;
	
	gl.uniform1f(program.ns, this.ns);
	gl.uniform3fv(program.ka, flatten(this.ka));
	gl.uniform3fv(program.kd, flatten(this.kd));
	gl.uniform3fv(program.ks, flatten(this.ks));
});

