layui.define("jquery", function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    "use strict";
    var $ = layui.jquery;
    var obj = {
        tab: function(selector){
            var $ibox = $(selector);
            $ibox.on('click', '.ibox_tab_title li',function(){
                var $this = $(this),
                    index = $this.index();
                $this.addClass('active').siblings('li').removeClass('active');
                $this.parents('.ibox').find('.ibox_tab_content').eq(index).addClass('show').siblings().removeClass('show');
            })
        },
        restVal: function(){
            $('body').on('click','i.icon_ca_layui', function(){
                $(this).siblings('input, textarea').val('');
            })
        },
        changeNub:function(options){
            var defaults = {
                selector:'.timer',      //选择器
                from: 0,               // 开始数字
                to: 0,                 // 结束数字
                speed: 1000,           // 速度
                refreshInterval: 100,  // how often the element should be updated
                decimals: 0,           // the number of decimal places to show
                formatter: formatter,  // handler for formatting the value before rendering
                onUpdate: null,        // callback method for every time the element is updated
                onComplete: null       // callback method for when the element finishes updating
            };
            var settings = $.extend(defaults, options);
            $(settings.selector).each(function(){
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;
                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);
                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
                // initialize the element with the starting value
                render(value);
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    render(value);
                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }
                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }
                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
            function formatter(value, settings) {
                return value.toFixed(settings.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        },
        navFixed: function(selector){
            var $_this = $(selector),
                $_this_prev_marginBottom = parseInt($_this.prev().css("margin-bottom").substring(0, $_this.prev().css("margin-bottom").length-2)),
                $_this_next_marginTop = parseInt($_this.next().css("margin-top").substring(0, $_this.next().css("margin-top").length-2)),
                _topPosition = $(document).scrollTop(),
                _navPosition = $_this.prev().outerHeight(true);
            _if();
            alert(_topPosition);
            $(document).scroll( function() {
                _topPosition = $(document).scrollTop();
                _if();
            });
            $(window).resize(function(){
                _navPosition = $_this.prev().outerHeight(true);
                _if();
            });
            function _if(){
                if (_topPosition >= _navPosition){
                    $_this.css("position", "fixed");
                    $_this.next().css("margin-top", $_this_prev_marginBottom + $_this.outerHeight() + $_this_next_marginTop + "px");
                }else{
                    $_this.css("position", "relative");
                    $_this.next().css("margin-top", $_this_next_marginTop + "px");
                }
            }
        },
        formToggle: function(options){
            var defaults = {
                selector:'.collapse-link',      //选择器
                ifTableResize: false
            };
            var num=0;
            var settings = $.extend(defaults, options);
            $(settings.selector).click(function(){
                var ibox = $(this).closest('div.ibox');
                var iboxTitle = ibox.find('div.ibox_title');
                var button = iboxTitle.find('i');
                var content = ibox.find('div.ibox_form');
                content.slideToggle(200);
                button.toggleClass('icon-down').toggleClass('icon-upward');
                ibox.toggleClass('border_b_n').toggleClass('mb-10');
                iboxTitle.toggleClass('border_b_n').toggleClass('');
                if(settings.ifTableResize){
                    debugger;
                    switch (num){
                        case 0:
                            setTimeout("setTableHeightTwo()","200");
                            num++;
                            return;
                        case 1:
                            setTimeout("setTableHeight()","200");
                            num--;
                            return;
                    }
                }
            });
        },
        addOption: function(options){
            var defaults = {
                selector:'.select',      //选择器
                data: ''
            };
            var settings = $.extend(defaults, options);
            var optionGroup = '<option value>--请选择--</option>';
            $.each(settings.data, function(key){
                optionGroup += '<option value="'+settings.data[key].id+'">'+settings.data[key].name+'</option>';
            });
            $(settings.selector).empty().append(optionGroup);
        },
        selectMove: function(){
            $('body').on('keydown','.layui-form-select .layui-unselect',function(e){
                var $selectBox = $(this).closest('div.layui-form-select');
                switch (e.which){
                    case 40:
                        e.preventDefault();
                        e.stopPropagation();
                        var hasLayThis = $selectBox.find('dd').hasClass('layui-this');
                        var layThis = $selectBox.find('dd.layui-this');
                        if(!hasLayThis){
                            $selectBox.find('dd').eq(0).addClass('layui-this').attr('tabindex','0').focus();
                        }else{
                            var hasThisNext = layThis.next().length == 0;
                            if(hasThisNext){
                                $selectBox.find('dd.layui-this').removeClass('layui-this');
                                $selectBox.find('dd').eq(0).addClass('layui-this').attr('tabindex','0').focus();
                            }else{
                                $selectBox.find('dd.layui-this').removeClass('layui-this').next().addClass('layui-this').attr('tabindex','0').focus();
                            }
                        }
                        return;
                }
            });
            $('body').on('keydown','.layui-form-select dl dd', function(e){
                var $selectBox = $(this).closest('div.layui-form-select');
                var $ddNub = $selectBox.find('dd').length;
                switch (e.which){
                    case 40:
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).removeClass('layui-this').removeAttr('tabindex');
                        var hasNext = $(this).next().length == 0;
                        if(hasNext){
                            $selectBox.find('dd').eq(0).addClass('layui-this').attr('tabindex','0').focus();
                        }else{
                            $(this).next().addClass('layui-this').attr('tabindex','0').focus();
                        }
                        return;
                    case 38:
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).removeClass('layui-this').removeAttr('tabindex');
                        var hasPrev = $(this).prev().length == 0;
                        if(hasPrev){
                            $selectBox.find('dd').eq($ddNub-1).addClass('layui-this').attr('tabindex','0').focus()
                        }else{
                            $(this).prev().addClass('layui-this').attr('tabindex','0').focus();
                        }
                        return;
                    case 13:
                        $(this).click();
                        return;
                }
            });
        },
        multiSelect: function(){
            var $select = $('.layui-form').find("select[multi-select]");

            $select.each(function(){
                var $selectObj = $(this).siblings('.layui-form-select');
                var $selectVal = $selectObj.find('.layui-unselect');

                //去除layui自带的绑定时间
                /*$(document).unbind();*/
                $selectObj.find('dl').unbind();
                $selectObj.find('dd').unbind();
                $selectObj.find('.layui-select-title').unbind();

                $selectObj.find('.layui-select-title').on('click',function(){
                    $selectObj.toggleClass('layui-form-selected');
                });

                $selectObj.find('dd').on('click',function(e){
                    var $this = $(this);
                    if(!hasChecked($this)){
                        $this.addClass('layui-checked');
                        addVal();
                        e.stopPropagation();
                    }else{
                        $this.removeClass('layui-checked');
                        addVal();
                    }
                });

                function addVal(){
                    if($selectObj.find("dd.layui-checked").length<1){
                        $selectVal.val("");
                        return false;
                    }else{
                        var str="";
                        for(var i = 0;i< $selectObj.find("dd.layui-checked").length;i++){
                            str += $selectObj.find("dd.layui-checked").eq(i).text() + ",";
                        }
                        str = str.substring(0,str.length-1);
                        $selectVal.val(str);
                    }
                    event.stopPropagation();
                }

                function hasChecked(obj){
                    return obj.hasClass('layui-checked')
                }
            });

        },
        addTags: function(options){
            var defaults = {
                selector: '#addtags',
                targetSelector:'.target-selector',
                value:["aaa", "bbb", "ccc"]
            };
            var $this = $(this);
            var options = $.extend(defaults, options);

            $this.each(function () {
                var that = $(options.targetSelector);
                var tagsGroup = '';
                $.each(options.value,function(index,itemObj){
                    tagsGroup += '<a "href="javascript:void(0);"><span>'+itemObj+'</span><em></em></a>';
                });
                var hasWarp = that.find('.plus-tag').length == 0;
                if(hasWarp){
                    var str =
                        '<div class="plus-tag tagbtn cl">'+tagsGroup+
                        '<input type="hidden" class="tags-input" value="'+options.value+'" name="">'+
                        '</div>';
                    that.append(str);
                }else{
                    var val = that.find('.tags-input');
                    var $tagWarp = that.find('.plus-tag');
                    var v1 = options.value;
                    var v2 = val.val();
                    var isContains  =  v2.indexOf(v1) >= 0;
                    var v = v2+','+v1;
                    if(!isContains){
                        if(v!=''){
                            if(v1.length>0){
                                val.val(v);
                                $tagWarp.append(tagsGroup);
                            }
                        }
                    }else{
                        layer.msg('已经添加过');
                    }
                }

                /*删除标签绑定*/
                $('body').on("click",".plus-tag a em",function(){
                    $(this).parents('a').remove();
                    var str ="";
                    if(that.find(".plus-tag a").length<1){
                        val.val("");
                        return false;
                    }else{
                        for(var i = 0;i< that.find(".plus-tag a").length;i++){
                            str += that.find(".plus-tag a").eq(i).find('span').text() + ",";
                        }
                        str = str.substring(0,str.length-1);
                        val.val(str);
                    }
                });
            })
        }
    };
    //输出test接口
    exports('test', obj);
});