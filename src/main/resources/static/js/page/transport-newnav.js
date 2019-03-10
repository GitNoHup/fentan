/*	项目名称：梧桐
 *	文件名称：梧桐系统框架内框架首页Js文件
 *	开发时间：2017/04/25
 * 	开发人员：398146685@qq.com
 * */



layui.use('slimscroll', function(){
	var slimscroll = layui.slimscroll;
	$("#second_nav").slimScroll({height:"100%",opacity: .4,railOpacity:.9});
	$("#menu_b").slimScroll({height:"100%",opacity: .4,railOpacity:.9});

});


$(function(){
	//窗口内容高度自适应
	$('.page_content').height($(window).height()-47+'px');
	$(window).resize(function(){
		$('.page_content').height($(window).height()-47+'px');
	});
	//添加向右工具
	addTurnRight();

	//导航过小时，出现滚动
	/*$("#second_nav").slimScroll({height:"100%",opacity: .4,railOpacity:.9});
	$("#menu_b").slimScroll({height:"100%",opacity: .4,railOpacity:.9});*/

	/*子菜单显示*/
	var $body = $('body');
	var $nav_box = $('#nav_box');
	var $secondNav = $('#second_nav');
	var $thirdNav = $('#third_nav');
	$body.on('click', '#menu_b ul li',function(){
		$secondNav.empty();
		$thirdNav.empty();
		$(this).addClass('active').siblings().removeClass('active');
		var $childCont = $(this).find('.submenu_wrapper').html();
		$(this).parent().addClass('active').siblings().removeClass('active');
		setTimeout(function(){
			$secondNav.append($childCont).fadeIn();
		},300);
		$nav_box.css({
			'width': '160px',
			'padding': '10px',
			'borderRight': '1px solid #eeeeee',
			'boxShadow': '0 3px 10px rgba(0, 0, 0, .2)'
		});
	});

	//二级菜单控制显示三级菜单
	$body.on('mouseenter', '#nav_box .submenu_ul .submenu_li a', function(){
		$thirdNav.css('display','none');
		$thirdNav.empty();
		$(this).parent().addClass('active').siblings().removeClass('active');
		var hasTag = $(this).attr('tag') == undefined;
		if(!hasTag){
			var thirdCont = $(this).siblings('.third_nav').html();
			setTimeout(function(){
				$thirdNav.append(thirdCont).fadeIn();
			},200);
			$nav_box.css({
			'width': '350px'
			});
		}else{
			$nav_box.css({
				'width': '160px'
			});
		}
	});

	//通过二三级区域后，隐藏菜单
	$nav_box.mouseleave(function(){
		$('#second_nav').empty();
		$('#third_nav').empty();
		$nav_box.css({
			'width': '0',
			'padding': '0',
			'borderRight': 'none',
			'boxShadow': 'none'
		});
		$('#menu_b ul li').removeClass('active');
	});

	//常用工具打开、缩回
	$('.toolbar_b .toolbar_down').click(function(){
		$(this).find('i').toggleClass('icon-sanjiao').toggleClass('icon-tripple-up');
		$('.toolbar_b .toolbar_list').slideToggle(200);
	});

	//顶部TAB控制IFRAME切换
	$body.on('click', '.page_tabs_b .page_tabs_content a',function(){
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.page_content').eq(index).addClass('show').siblings().removeClass('show');
	});

	//关闭顶部tab标签
	$body.on('click','.page_tabs_b .page_tabs_content a i',function(event){
		/*
		 * 其实只需要判断当前点击的这个tab的li标签是否有active 就可以知道外面是否还有active标签
		 * 如果hasActive是true 那说明剩余就没有active的li标签了
		 * */
		var hasActive=$(this).parent('a').hasClass('active');
		var Tabli=$(this).parent('a').index();
		$('.page_content').eq(Tabli).remove();
		$(this).parent('a').remove();

		if(hasActive){
			$('.page_tabs_b .page_tabs_content a:last').addClass('active');
			$('.page_content:last').addClass('show').siblings('.page_content').removeClass('show');
		}else{
			$('.page_content').siblings().removeClass('show');
			var divTag=$('.page_tabs_b .page_tabs_content a[class="active"]').attr('tag');
			$(".page_content[tag='"+divTag+"']").addClass('show');
		}
		event.stopPropagation();
	});

	//当TAB切换很多时，可以向左，向右
	$(".roll_left").on("click", i);
	$(".roll_right").on("click", a);
});

//通过判断tag，动态添加向右图标
function addTurnRight(){
	var obj = '<i class='+'"iconfont icon-forward"'+'></i>';
	$(".submenu_wrapper .submenu_ul .submenu_li a[tag]").append(obj);
}

function addTabBar(url,title,tag){

	//跳转到页面后，收回二三级菜单
	subMenuHide();

	//添加之前去除兄弟模块的选中状态
	$('.page_tabs_b .page_tabs_content a.active').removeClass('active');

	//根据tag标签判断这个标签是否存在，如果存在就设置成选中状态
	var $tag = $(".page_tabs_b .page_tabs_content a[tag='"+tag+"']");
	var isTag = $tag.length;

	if(!isTag){
		var Wh=$(window).height()-47;

		//给父级添加tab标签
		var strTab = '<a href="javascript:void(0)" data-src='+url+' class="active" tag="'+tag+'">' + title + '<i class="iconfont icon-close ml-5" style="font-size: 14px;"></i></a>';
		$(".page_tabs_b .page_tabs_content").append(strTab);

		//给父级框架注入iframe
		var iframeDiv = '<div class="page_content show animated fadeInRight" tag="'+tag+'" style="height:'+Wh+'px"><iframe scrolling="yes" frameborder="0" src="'+url+'"></iframe></div>';
		$('.page_content').removeClass('show');
		$('.page_content:last').after(iframeDiv);
	}else{
		$tag.addClass('active').siblings('a').removeClass('active');
		$('.page_content').eq($tag.index()).addClass('show').siblings().removeClass('show');
	}
}

//二三级菜单隐藏方法
function subMenuHide(){
	$('#nav_box').css({
		'width': '0',
		'padding': '0',
		'borderRight': 'none'
	});
	$('#second_nav').empty();
	$('#third_nav').empty();
	$('#menu_b ul li').removeClass('active');
}

function t(t) {
	var e = 0;
	return $(t).each(function () {
		e += $(this).outerWidth(!0)
	}), e
}

function a() {
	var e = Math.abs(parseInt($(".page_tabs_content").css("margin-left"))),
		a = t($(".page_tabs_b").children().not(".page_tabs_b")),
		i = $(".page_tabs_b").outerWidth(!0) - a,
		n = 0;
	if ($(".page_tabs_content").width() < i) {
		$(".page_tabs_content").animate({
			marginLeft: 0  + "px"
		}, "fast");
		return !1
	}
	for (var s = $(".page_tabs_content a:first"), r = 0; r + $(s).outerWidth(!0) <= e;) r += $(s).outerWidth(!0), s = $(s).next();

	if (r = 0, t($(s).prevAll()) > i) {
		for (; r + $(s).outerWidth(!0) < i && s.length > 0;) r += $(s).outerWidth(!0), s = $(s).prev();
		n = t($(s).prevAll())
	}
	$(".page_tabs_content").animate({
		marginLeft: 0 - n + "px"
	}, "fast")
}

function i() {
	var e = Math.abs(parseInt($(".page_tabs_content").css("margin-left"))),
		a = t($(".page_tabs_b").children().not(".page_tabs_b")),
		i = $(".page_tabs_b").outerWidth(!0) - a,
		n = 0;
	if ($(".page_tabs_content").width() < i) return !1;
	for (var s = $(".page_tabs_content a:first"), r = 0; r + $(s).outerWidth(!0) <= e;) r += $(s).outerWidth(!0), s = $(s).next();
	for (r = 0; r + $(s).outerWidth(!0) < i && s.length > 0;) r += $(s).outerWidth(!0), s = $(s).next();
	n = t($(s).prevAll()), n > 0 && $(".page_tabs_content").animate({
		marginLeft: 0 - n + "px"
	}, "fast")
}



