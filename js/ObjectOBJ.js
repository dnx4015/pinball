function ObjectOBJ(){
    this.vertices = [];
    this.textureCoords = [];
    this.normals = [];
    this.indices = [];
    this.ns = 0;
    this.ka = [];
    this.kd = [];
    this.ks = [];
    this.textureFilePath = '';
	this.objRead = false;
	this.mtlRead = false;
	this.complete = false;

	this.caller = null;
	this.callback = null;
}

ObjectOBJ.method('readFile', function(fileName, caller, callback){
	var me = this;
	this.caller = caller;
	this.callback = callback;
    $.get(fileName + '.obj', function(data) {
        me.processObj(data);
    }, 'text');
    $.get(fileName + '.mtl', function(data) {
        me.processMtl(data);
    }, 'text');
});

ObjectOBJ.method('processObj', function(data){
	var index = 0;
	var objVertices = [];
	var objTextureCoords = [];
	var objNormals = [];

	var indexesSaved = [];
	var indexesSavedIndex = 0;
	var verticesBits = 0;
	var textureBits = 0;
	
    var lines = data.split('\n');
	var words = [];
	var coords = [];
    
	var me = this;

	$.each(lines, function(i, line) {
        words = line.split(' ');
        switch(words[0]){
            case 'v':
				objVertices.push(
					parseFloat(words[1]), 
					parseFloat(words[2]), 
					parseFloat(words[3]));
                break;
            case 'vt':
				objTextureCoords.push(
					parseFloat(words[1]), 
					parseFloat(words[2]));
                break;
            case 'vn':
				objNormals.push(
					parseFloat(words[1]), 
					parseFloat(words[2]), 
					parseFloat(words[3]));
                break;
            case 'f':
				if(textureBits === 0 && verticesBits === 0){
					textureBits = MathUtils.log2(objTextureCoords.length + 1);
					verticesBits = MathUtils.log2(objVertices.length + 1) + textureBits;
				}
				for (var i = 1; i <= 3; i++){
					coords = words[i].split('/');
					coords = MathUtils.parseToFloat(coords);

					indexesSavedIndex = 
							((coords[0] - 1) << verticesBits) + 
							((coords[1]- 1) << textureBits) +
							(coords[2]);
					if(indexesSaved[indexesSavedIndex] === undefined){
						var vertices = 	objVertices.slice(
								3 * (coords[0] - 1), 
								3 * coords[0]);
						me.vertices.push(vertices[0],vertices[1], 
										vertices[2]);
						var textureCoords = objTextureCoords.slice(
								2 * (coords[1] - 1), 
								2 * coords[1]);
						me.textureCoords.push(textureCoords[0],
												textureCoords[1]);
						var normals = objNormals.slice(
								3 * (coords[2] - 1), 
								3 * coords[2]);
						me.normals.push(normals[0], normals[1], 
									normals[2]);
						me.indices.push(index);
						indexesSaved[indexesSavedIndex] = index++;
					}else{
						me.indices.push(indexesSaved[indexesSavedIndex]);
					}
				}
                break;
        } 
    });
	this.objRead = true;
    this.complete = this.objRead && this.mtlRead;
	this.caller[this.callback]();
});


ObjectOBJ.method('processMtl', function(data){
    var lines = data.split('\n');
	var words = [];
	var me = this;
    $.each(lines, function(i, line) {
        words = line.split(' ');
		switch(words[0]){
			case 'Ns': 
				me.ns = parseFloat(words[1]); 
				break;
			case 'Ka':
				me.ka.push(
					parseFloat(words[1]), 
					parseFloat(words[2]), 
					parseFloat(words[3])); 
				break;
			case 'Kd':
				me.kd.push(
					parseFloat(words[1]), 
					parseFloat(words[2]), 
					parseFloat(words[3]));
					break;
			case 'Ks':
				me.ks.push(
					parseFloat(words[1]), 
					parseFloat(words[2]), 
					parseFloat(words[3]));  
				break;
			case 'map_Kd':
				var imagePath = words[1].split('/');
				var imageName = imagePath[imagePath.length - 1];
				me.textureFilePath = Constants.textureDir + imageName;
		}
	});
	this.mtlRead = true;
    this.complete = this.objRead && this.mtlRead;
	this.caller[this.callback]();
});


