(function(gloab){
	var ajax = function (url, data, method, async, callback){
		$.ajax({
			url: url,
			data: data,
			method: method,
			contentType: "application/json",
			async: async,
			success: function (response){
				if(response.respCode == "000"){
					callback(response.data);
				} else {
					layui.use('layer', function(layer){ 
						layer.msg(!response.resMessage ? "服务异常" : response.resMessage, {icon: 5});
					});
				}
			},
			error: function (){
				layui.use('layer', function(layer){ //温馨提示：多次调用use并不会重复加载laytpl.js，Layui内部有做模块cache处理。
					layer.msg("网络链接超时", {icon: 5});
				});
			}
			
		});
	}
		
	var optionInit = function (element, list){
		$(element).empty(); 
		for (e in list) {
			var opt = document.createElement("option"); 
			opt.appendChild(document.createTextNode(list[e].value));
			opt.setAttribute("value",list[e].key);
			element.appendChild(opt);
		}
	}
	
	var get = function (url, data, callback){
		ajax(url, data, 'GET', false, callback);
	}
	
	var syncGet = function (url, data, callback){
		ajax(url, data, 'GET', true, callback);
	}
	
	var post = function (url, data, callback){
		ajax(url, data, 'POST', false, callback);
	}
	
	var syncPost = function (url, data, callback){
		ajax(url, data, 'POST', true, callback);
	}
		
	var loadSysArea = function (element ,parentCode){
		var url = "/face-realname/sysArea/findByParentCode";
		tools.get(url, {parentCode: parentCode}, function (data){
			var nodes = [{key: "", value: "请选择"}, {key: "", value: "请选择"}];
			for(var i in data){
				var node = {key: data[i].code, value: data[i].name};
				nodes.push(node);
			}
			
			tools.optionInit(element, nodes);
		})
	}
	
	var responseHandler = function(response) {
		var result = new Object();

		if(response.respCode == "000"){
			result.rows = response.data.list;
			result.total = response.data.total;
			return result;
		} 
		
		layui.use('layer', function(layer){ 
			layer.msg(!response.resMessage ? "服务异常" : response.resMessage, {icon: 5});
		});
		
		result.rows = [];
		result.total = 0;
		return result;
	}
	
	var loadPushRecords = function (url, element){
		var id = $(element).data("push");
		get(url, {recordId: id}, function (data){
			var content = "";
			if(!data){
				content = '暂未存在推送记录';
			} else {
				
				if(!data.result){
					data.result = "<无>";
				}
				
				if(data.result == "S01"){
					data.result = "非法的XML格式";
				}
				
				if(data.result == "S14"){
					data.result = "用户证件号码不合法";
				}
				
				content += '<span>推送状态： ' + (data.status == 1 ? '推送成功' : '推送失败')  + '</span><br>';
				content += '<span>推送时间： ' + data.createTime + '</span><br>';
				content += '<span>返回结果： ' + data.result   + '</span>';
			}
			
			layer.tips(content, '[data-push='+id+']', {
				time: 0,
				closeBtn: '2',
				area: ['300px', '80px'],
		  		tips: [1,  '#009688'] //还可配置颜色
			});
		})
	}


	//身份证号码脱敏
	var formatIdCard = function (val){
        if (val) {
            val = val.substring(0, 6)+'******' + val.substring(val.length - 4)
        }

        return val;
	}

	var methods = {
		optionInit: optionInit,
		loadSysArea: loadSysArea,
		post: post,
		syncPost: syncPost,
		get: get,
		syncGet: syncGet,
		responseHandler: responseHandler,
		loadPushRecords: loadPushRecords,
        formatIdCard: formatIdCard
	}
	
	gloab.tools = methods;
})(window);
