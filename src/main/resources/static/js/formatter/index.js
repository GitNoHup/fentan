var formatter = {
	dataSource : function (value, row, index){
		if (value == "01") {
			return "巴枪后台录入";
		} else if (value == "02") {
			return "PC录入";
		} else if (value == "03") {
			return "PDA录入";
		} else if (value == "04") {
			return "梧桐录入";
		} else if (value == "05") {
			return "快宝录入";
		} else if (value == "06") {
			return "大客户平台上传";
		} else if (value == "07") {
			return "网点自上传";
		}  else if (value == "08") {
			return "订单平台";
		} else if (value == "09") {
            return "微信";
        } else if (value == "10") {
            return "丰巢";
        } else if (value == "11") {
            return "菜鸟裹裹";
        } else if (value == "12") {
            return "APP";
        }
		return value;
	},
	userType: function(value, row, index) {
		if(value == 1){
			return "非协议用户";
		} else if(value == 2){
			return "协议用户";
		}
		return value;
	},
	cardType: function(value, row, index) {
		if(value == 01){
			return "二代身份证";
		} else if(value == 02){
			return "临时居民身份证";
		} else if(value == 03){
			return "户口薄";
		} else if(value == 04){
			return "中国人民解放军军人身份证";
		} else if(value == 05){
			return "中国人民武装警察身份证";
		} else if(value == 06){
			return "港澳居民来往内地通行证";
		} else if(value == 07){
			return "台湾居民来往大陆通行证";
		} else if(value == 08){
			return "外国公民护照";
		} else if(value == 09){
			return "中国公民护照";
		} else if(value == 10){
			return "港澳台居民居住证";
		} 
		return value;
	},
	sex: function(value, row, index) {
		if(value == 1){
			return "男";
		}else if(value == 2){
			return "女";
		}
		return value;
	},
	pushStatus: function(value, row, index) {
		if(value == '2'){
			return '<span class="layui-btn layui-btn-warm layui-btn-mini btnName" data-type="getPushRecords" data-push="' +row.id+ '">待推送</span>';
		}else if(value == '1'){
			return '<span class="layui-btn layui-btn-mini btnName"  data-type="getPushRecords" data-push="' +row.id+ '">推送成功</span>';
		}
		return '<span class="layui-btn layui-btn-danger layui-btn-mini btnName" data-type="getPushRecords" data-push="' +row.id+ '">推送失败</span>';
	},
	realnameWaybillUserType: function(value, row, index){
		if(value == 1){
			return "个人用户";
		}else if(value == 2){
			return "企业用户";
		}
		return value;
	},
	customerConvertType: function(value, row, index){
		if(value == 'JD'){
			return "京东客户";
		}
		return value;
	},
	checkMethod: function(value, row, index){
		if(value == "99"){
			return "协议";
		}else {
			return "散件";
		}
		return value;
	},
	realnameStatus: function(value, row, index) {
		if(value == '0'){
			return '<span class="layui-btn layui-btn-danger layui-btn-mini">未实名</span>';
		}else if(value == '1'){
			return '<span class="layui-btn layui-btn-mini">已实名</span>';
		}
		return value;
	}
}