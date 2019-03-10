layui.define("jquery", function(exports){ 
	var $ = layui.jquery;
	
	var methos = {
		load : function (element, url, data){
			$.ajax({
				url : url,
				data : data,
				async : false,
				success : function (response){
					if(response.respCode == "000"){
						var list = response.data;
						for (e in list) {
							var opt = document.createElement("option"); 
							opt.appendChild(document.createTextNode(list[e].value));
							opt.setAttribute("value",list[e].key);
							element.appendChild(opt);
						}
					} else {
						layer.msg(!response.resMessage ? "服务异常" : response.resMessage, {icon: 5});
					}
				}
			})
		}
	}
	
	exports('combox', methos);
})