layui.define("jquery", function(exports){ 
	var $ = layui.jquery;
	
	var errorCallback = function () {
		layer.msg("访问异常", {icon: 5})
	}
	
	var urlEncode = function (param, key, encode) {
		if(param==null) return '';
		var paramStr = '';
		var t = typeof (param);
		if (t == 'string' || t == 'number' || t == 'boolean') {
			paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
		} else {
			for (var i in param) {
				var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
				paramStr += urlEncode(param[i], k, encode);
			}
		}
		return paramStr;
	};
	
	var methos = {
		post : function (url, form, callback) {
			$.ajax({
				url : url,
				contentType : "application/json",
				method : "post",
				data : JSON.stringify(form),
				async : false,
				success : function (response){
					if(response.respCode == "000"){
						callback(response.data);
					} else {
						layer.msg(!response.resMessage ? "服务异常" : response.resMessage, {icon: 5});
					}
				},
				error : errorCallback 
			})	
		},
		get : function (url, form, callback) {
			$.ajax({
				url : url,
				data : form,
				async : false,
				success : function (response){
					if(response.respCode == "000"){
						callback(response.data);
					} else {
						layer.msg(!response.resMessage ? "服务异常" : response.resMessage, {icon: 5});
					}
				},
				error : errorCallback 
			})
		},
		downloadFile : function (url, param, key){
			try{ 
				console.log(urlEncode(param));
	            var elemIF = document.createElement("iframe");   
	            elemIF.src = url+ "?1=1" + urlEncode(param);   
	            elemIF.style.display = "none";   
	            document.body.appendChild(elemIF);   
	        }catch(e){ 
	 
	        } 
		},
		urlEncode : urlEncode,
		confirm : function (message, callback){
			var i = layer.confirm(message, {
					btn: ['确定','取消'], //按钮
					icon : 3
				}, function(){
					callback();
					layer.close(i);
				}, function(){
				
				}
			);
		}
		
	}
	
	exports('http', methos);
	
})