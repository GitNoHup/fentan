var timestampFormatter = function(value, row, index) {
	if (value) {
		var date = new Date();
		date.setTime(value * 1000);
		return date.toLocaleString();
	}
	return "";
}

var ipFormatter = function(value, row, index) {
	if (value) {
		return (Math.floor(value / (256 * 256 * 256))) + "."
				+ (Math.floor(value % (256 * 256 * 256) / (256 * 256))) + "."
				+ (Math.floor(value % (256 * 256) / 256)) + "."
				+ (Math.floor(value % 256));
	}
	return value;

}

var userNameFormatter = function(value, row, index) {
	if (value) {
		var len = value.length
		if( len > 2){
			var start = value.substring(0,1);
			var end = value.substring(len -1, len);
			
			for(var i = 0; i< len-2 ; i++) {
				start += "*";
			}
			return start + end;
		}else if(len == 2) {
			var start = value.substring(0,1);
			return start + "*";
		}
	}
	return value;
}


var mobileFormatter = function(value, row, index) {
	if (value) {
		var len = value.length
		if( len >= 11){
			var start = value.substring(0,3);
			var end = value.substring(len -4, len);
			
			for(var i = 0; i< len-7 ; i++) {
				start += "*";
			}
			return start + end;
		}
	}
	return value;
}
