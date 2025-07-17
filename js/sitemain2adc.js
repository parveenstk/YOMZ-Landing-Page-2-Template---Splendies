new RegExp('://splendies.com').test(window.location.href) && (window.location.href = window.location.href.replace(/\:\/\//, '://www.'));

function _e(id){var el = document.getElementById(id); el = el==undefined?document.createElement("span"):el; return el; };
function _cl(id, classid){ return classid==undefined?document.getElementsByClassName(id):document.getElementById(id).getElementsByClassName(classid); };
function isMail(id){return (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(id);};
function getnum(num){ num = Number(num.toString().trim()); return !isNaN(num)?num:0;};
Element.prototype.switchClass = function(cl, add){add = add==undefined?true:add; this.className = (add?this.className+(!new RegExp(cl).test(this.className)?" "+cl:""):this.className.replace(new RegExp("(\ *)"+cl, "g"), "")).trim(); return this;};
Element.prototype.getClass = function(cl){var el = this.getElementsByClassName(cl); return el[0]||document.createElement("span");};
Element.prototype.getTag = function(tg){var el = this.getElementsByTagName(tg); return el[0]||document.createElement(tg);};
Element.prototype.getByName = function(elAtrName){var el=document.getElementsByName(elAtrName); return el[0]||document.createElement('input');};
Element.prototype.parent = function (className){var obj = this; found = false; while(obj!=null && !found){ obj = obj.parentNode; found = obj!=null && new RegExp(className).test(obj.className);} return obj!=null?obj:document.createElement("span");};
Element.prototype.addClass = function(name){if(!new RegExp(name, "gi").test(this.className)){this.className = this.className+" "+name;}return this;};
Element.prototype.removeClass = function(name){this.className = this.className.replace(new RegExp(name, "gi"), '').replace(/ {2,}/g, ' ').replace(/^ | $/gi, ''); return this;};
function makeString(t,n,e){var o="",r="";for(n=void 0==n?10:n,t=void 0==t?"uln":t,o+=void 0!=e?e:"",o+=/u/.test(t)?"ABCDEFGHIJKLMNOPQRSTUVWXYZ":"",o+=/l/.test(t)?"abcdefgijklmnopqrstuvwxyz":"",o+=/n/.test(t)?"0123456789":"",o+=/s/.test(t)?"`~!@#$%^&*()_+-={}|][:;\"'<>,./?":"";r.length<n;)r+=o.charAt(Math.floor(Math.random()*o.length));return r};
Element.prototype.d = function(name){return this.getAttribute("data-"+name);};

$(document).ready(function(e) {
	setTimeout(spl.checkJobQueue, 10000);
	
	// tracing
	var history = localStorage._hst, vlHistory=0;
	if(history){
		try {
			history=JSON.parse(history);
			vlHistory=1;
		}catch(e){}
	}
	!vlHistory?history={}:0;
	history[window.location.href.replace(/https\:\/\/www\.splendies\.com\//i, '')] = 1;
	localStorage.setItem('_hst', JSON.stringify(history));
});
var spl = {
	checkJobQueue:function(){
		if(new Date().getMinutes()%5==0){
			// $.get('https://app.splendies.com/ajax/check-queue.php');
		}
	}
};
$.fn.preloader_show = function(attrs){
	var obj = $(this);
	attrs = attrs==undefined?{}:attrs;
	attrs.theme = attrs.theme!=undefined?"dark":"light";
	attrs.z = attrs.z==undefined?1500:attrs.z;
	obj.css({position:"relative"});
	obj.find(".hover-preloader").remove();
	obj.append('<div class="hover-preloader '+attrs.theme+'" style="z-index:'+attrs.z+';">'+
		'<div class="item-container">'+
			'<span class="image">'+
				'<img src="'+'images/w8'+(attrs.theme=="dark"?'-white':'')+'.gif?ver=1.1" />'+
			'</span>'+
			'<span class="label">'+(attrs.label!=undefined?attrs.label:'Please wait..')+'</span>'+
		'</div>'+
	'</div>');
};
$.fn.preloader_remove = function(){
	var obj = $(this);
	obj.find(".hover-preloader").remove();
}
var popup = {
	show : function(title, content, ops){
		ops = ops==undefined?{}:ops;
		title = title!=undefined?title:"";
		content = content!=undefined?content:"";
		ops.closebtn = ops.closebtn!=undefined?ops.closebtn:true;
		if(ops.mode=="info"){
			title = '<div style="text-align:center;">'+title+'</div>';
			content = '<div style="text-align:center;">'+content+'</div>';
			ops.ok_btn = ops.ok_btn!=undefined?ops.ok_btn:true;
			ops.width = ops.width==undefined?500:ops.width;
		}
		var popObj = document.createElement("div");
		if(ops.id!=undefined) popObj.id = ops.id;
		popObj.className = "popup-frame";
		popObj.innerHTML = '<div class="popup-window" style="'+(ops.width!=undefined?'width:'+ops.width+'px; ':'')+
		(ops.height!=undefined?'height:'+ops.height+'px; ':'')+'">'+
			(ops.closebtn?'<div class="popup-close"><em class="glyphicon glyphicon-remove"></em></div>':'')+
			(title?'<div class="popup-heading">'+title+'</div>':'')+
			'<div class="popup-content-fm">'+
				content+(ops.ok_btn?'<div class="text-center pt15"><span class="ok_btn pix-btn success">OK</span></div>':'')+
			'</div>'+
		'</div>';
		ops.closebtn?popObj.getClass('popup-close').onclick=popup.close:0;
		ops.ok_btn?popObj.getClass('ok_btn').onclick=popup.close:0;
		var newZ = $(".popup-frame:first-child");
		newZ = newZ.length>0?newZ[0].style.zIndex:(ops.zIndex||10000);
		popObj.style.zIndex = newZ+1;
		$("body").prepend(popObj);
		if(ops.callback!=undefined){
			a = {};
			for(ok in ops){
				!(/^(width|callback|closebtn|close_btn|id|height)$/gi).test(ok)?a[ok]=ops[ok]:0;
			}
			ops.callback(a);
		}
		popObj.resizeEvent = function(){
			popup.updateHeight($(popObj));
		};
		$(window).bind("resize", popObj.resizeEvent);
		$("html").css({overflow:"hidden"});
		popObj.resizeEvent();
	},
	close:function(e) {
		popup.hide($(this).parents(".popup-frame"));
	},
	hide : function(obj, ops){
		ops = ops==undefined?{}:ops;
		obj = obj==undefined?$(".popup-frame"):obj;
		obj[0]?$(window).unbind("resize", obj[0].resizeEvent):0;
		obj.remove();
		ops.callback?ops.callback():0;
		$("html").css({overflow:""});
	},
	updateHeight : function(obj){
		$('.popup-content-fm').css({maxHeight:$(window).height()-118});
	},
	showPreloader:function(msg, width, id){
		this.show('', '<div style="text-align:center;padding-right:22px;"><img src="https://app.splendies.com/images/w8.gif" style="vertical-align:-3px;margin-right:10px" />'+(msg||'Loading. Please wait..')+'</div>', {width:width||400, closebtn:0, id:id});
	}
};

$(document).ready(function(e) {
	$(".mob_btn,#close").click(function(e) {
    	e.preventDefault(), $("#mob_menu").toggleClass("show_menu");
	});
	$(".tetsimonial_slider").owlCarousel({
		autoplay: !0, autoplayTimeout: 5e3, transitionStyle: "fade", loop: !0, margin: 10, nav: !0, items: 5,
		responsive: {
			200: {items: 1},
			300: {items: 1},
			600: {items: 1},
			800: {items: 1}
		}
	});
	$(".mobile_banner").owlCarousel({
		autoplay: !0, autoplayTimeout: 5e3, transitionStyle: "fade", loop: !0, margin: 10, nav: !0, items: 1,
		responsive: {
			200: {items: 1},
			300: {items: 1},
			600: {items: 1},
			800: {items: 1}
		}
	});
	$(window).unbind("scroll").scroll(function() {
		var e = $(window).scrollTop();
		e > 250 ? $(".scrool_down_navigation").addClass("fixed-top") : $(".scrool_down_navigation").removeClass("fixed-top");
		e > 50 ? $(".fixed_sec").addClass("fixed_sec_top") : $(".fixed_sec").removeClass("fixed_sec_top");
	});
	$('.pop-size-chart').click(showSizeChartFun);
});
function showSizeChartFun(){
    popup.show('', '<div class="size-chart-pop"><div class="volupties_size_chart">\
    <div class="text-center">\
        <div class="volupties_size_chart_head">\
            <h3>Splendies Size Chart</h3>\
        </div>\
        <div class="splendies_size_chart_table">\
            <div class="size-table">\
                <div class="table_row main-head">\
                    <div class="val blank_row"></div>\
                    <div class="table_heads">Small</div>\
                    <div class="table_heads">Medium</div>\
                    <div class="table_heads">Large</div>\
                    <div class="table_heads">Extra Large</div>\
                </div>\
                <div class="table_row cfx">\
                        <div class="table_heads row_heads">NUMERICAL</div>\
                        <div class="val"><span class="mob-hed">Small</span>4-6</div>\
                        <div class="val"><span class="mob-hed">Medium</span>8-10</div>\
                        <div class="val"><span class="mob-hed">Large</span>12-14</div>\
                        <div class="val"><span class="mob-hed">Extra Large</span>16</div>\
                    </div>\
                    <div class="table_row cfx">\
                        <div class="table_heads row_heads">WAIST (IN)</div>\
                        <div class="val"><span class="mob-hed">Small</span>26-28</div>\
                        <div class="val"><span class="mob-hed">Medium</span>28-30</div>\
                        <div class="val"><span class="mob-hed">Large</span>30-32</div>\
                        <div class="val"><span class="mob-hed">Extra Large</span>34-36</div>\
                    </div>\
                    <div class="table_row cfx">\
                        <div class="table_heads row_heads">HIPS (IN)</div>\
                        <div class="val"><span class="mob-hed">Small</span>34-36</div>\
                        <div class="val"><span class="mob-hed">Medium</span>37-39</div>\
                        <div class="val"><span class="mob-hed">Large</span>40-42</div>\
                        <div class="val"><span class="mob-hed">Extra Large</span>43-45</div>\
                    </div>\
            </div>\
        </div>\
    </div>\
    </div>\
    <div class="splendies_size_chart">\
    <div class="text-center">\
        <div class="volupties_size_chart_head">\
            <h3>Splendies Plus Size Chart</h3>\
        </div>\
        <div class="splendies_size_chart_table">\
            <div class="size-table">\
                <div class="table_row main-head">\
                    <div class="val blank_row"></div>\
                    <div class="table_heads">1X</div>\
                    <div class="table_heads">2X</div>\
                    <div class="table_heads">3X</div>\
                    <div class="table_heads">4X</div>\
                </div>\
                <div class="table_row cfx">\
                    <div class="table_heads row_heads">NUMERICAL</div>\
                    <div class="val"><span class="mob-hed">1X</span>16-18</div>\
                    <div class="val"><span class="mob-hed">2X</span>18-20</div>\
                    <div class="val"><span class="mob-hed">3X</span>22-24</div>\
                    <div class="val"><span class="mob-hed">4X</span>26-28</div>\
                </div>\
                <div class="table_row cfx">\
                    <div class="table_heads row_heads">WAIST (IN)</div>\
                    <div class="val"><span class="mob-hed">1X</span>34-36</div>\
                    <div class="val"><span class="mob-hed">2X</span>38-40</div>\
                    <div class="val"><span class="mob-hed">3X</span>42-44</div>\
                    <div class="val"><span class="mob-hed">4X</span>46-48</div>\
                </div>\
                <div class="table_row cfx">\
                    <div class="table_heads row_heads">HIPS (IN)</div>\
                    <div class="val"><span class="mob-hed">1X</span>44-46</div>\
                    <div class="val"><span class="mob-hed">2X</span>47-49</div>\
                    <div class="val"><span class="mob-hed">3X</span>50-52</div>\
                    <div class="val"><span class="mob-hed">4X</span>52-54</div>\
                </div>\
            </div>\
        </div>\
    </div>\
    </div>\
    <div class="volupties_size_chart">\
    <div class="text-center">\
        <div class="volupties_size_chart_head">\
            <h3 class="top-margin">Bralettes Size Chart</h3>\
        </div>\
        <div class="splendies_size_chart_table">\
            <div class="size-table">\
                <div class="table_row main-head">\
                    <div class="val blank_row"></div>\
                    <div class="table_heads">Small</div>\
                    <div class="table_heads">Medium</div>\
                    <div class="table_heads">Large</div>\
                    <div class="table_heads">Extra Large</div>\
                </div>\
                <div class="table_row cfx">\
                    <div class="table_heads row_heads">BUST</div>\
                    <div class="val"><span class="mob-hed">Small</span>32-34</div>\
                    <div class="val"><span class="mob-hed">Medium</span>34-36</div>\
                    <div class="val"><span class="mob-hed">Large</span>36-38</div>\
                    <div class="val"><span class="mob-hed">Extra Large</span>38-40</div>\
                </div>\
                <div class="table_row cfx">\
                    <div class="table_heads row_heads">CUP SIZE</div>\
                    <div class="val"><span class="mob-hed">Small</span>A/B</div>\
                    <div class="val"><span class="mob-hed">Medium</span>B/C</div>\
                    <div class="val"><span class="mob-hed">Large</span>C</div>\
                    <div class="val"><span class="mob-hed">Extra Large</span>D</div>\
                </div>\
            </div>\
        </div>\
        <div class="splendies_size_chart_table">\
            <div class="size-table">\
                <div class="table_row small-t main-head">\
                    <div class="val blank_row"></div>\
                    <div class="table_heads">1X</div>\
                    <div class="table_heads">2X</div>\
                    <div class="table_heads">3X</div>\
                </div>\
                <div class="table_row small-t cfx">\
                    <div class="table_heads row_heads">BUST</div>\
                    <div class="val"><span class="mob-hed">1X</span>43-44</div>\
                    <div class="val"><span class="mob-hed">2X</span>45-46</div>\
                    <div class="val"><span class="mob-hed">3X</span>48-49</div>\
                </div>\
                <div class="table_row small-t cfx">\
                    <div class="table_heads row_heads">CUP SIZE</div>\
                    <div class="val"><span class="mob-hed">1X</span>D</div>\
                    <div class="val"><span class="mob-hed">2X</span>DD</div>\
                    <div class="val"><span class="mob-hed">3X</span>DD</div>\
                </div>\
            </div>\
        </div>\
    </div>\
    </div></div>', {width:900,id:'sizeCartPop'});

    if(screen.height >=900){
        $('.size-chart-pop').css({overflowY: 'hidden'});
    }
    window.addEventListener('resize', function(event) {
        if(screen.height >=900){
            $('.size-chart-pop').css({overflowY: 'hidden'});
        }else{
            $('.size-chart-pop').css({overflowY: 'auto'});
        }
    }, true);
}