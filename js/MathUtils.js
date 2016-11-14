function MathUtils(){}

MathUtils.log2 = function (num){
	var response = (Math.log(num))/(Math.log(2));
	return Math.ceil(response);
}

MathUtils.parseToFloat = function (arr){
	var l = arr.length;
	for(var i = 0; i < l; i++){
		arr[i] = parseFloat(arr[i]);
	}
	return arr;
}

