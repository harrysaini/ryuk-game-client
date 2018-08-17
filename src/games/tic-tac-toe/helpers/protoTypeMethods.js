Array.prototype.clone2DArray = function(){
	var arr = this,
		copiedArray =[];
	arr.forEach(function(subArr){
		var copiedSubArray = [];
		subArr.forEach(function(val){
			copiedSubArray.push(val);
		});
		copiedArray.push(copiedSubArray);
	});
	return copiedArray;
};