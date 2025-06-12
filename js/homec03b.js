var instaFeedMain;  
$(document).ready(function(e) {
	var wdh = screen.width, swidth;
	swidth = wdh > 1500?(wdh > 1650?(wdh - 260):(wdh - 170)):1170;
	instaFeedMain = $('#instaFeedMain');
	$('.unboxing-video-thumb').click(hData.onUnboxingThumbClick);
	window.addEventListener('scroll', hData.checkInstafeedScroll);
	if(jQuery('.tp-banner').length > 0){
		jQuery('.tp-banner').show().revolution({
			dottedOverlay:"none", delay:16000, startwidth:swidth, startheight:500, hideThumbs:200, thumbWidth:100, thumbHeight:50, thumbAmount:5,
			navigationType:"bullet", navigationArrows:"solo", navigationStyle:"preview2", touchenabled:"on", onHoverStop:"on", swipe_velocity: 0.7,
			swipe_min_touches: 1, swipe_max_touches: 1, drag_block_vertical: false, parallax:"mouse", parallaxBgFreeze:"on", parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
			keyboardNavigation:"off", navigationHAlign:"center", navigationVAlign:"bottom", navigationHOffset:0, navigationVOffset:20, soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center", soloArrowLeftHOffset:20, soloArrowLeftVOffset:0, soloArrowRightHalign:"right", soloArrowRightValign:"center", soloArrowRightHOffset:20,
			soloArrowRightVOffset:0, shadow:0, fullWidth:"on", fullScreen:"off", spinner:"spinner4", stopLoop:"off", stopAfterLoops:-1, stopAtSlide:-1,
			shuffle:"off", autoHeight:"off", forceFullWidth:"off", hideThumbsOnMobile:"off", hideNavDelayOnMobile:1500, hideBulletsOnMobile:"off", hideArrowsOnMobile:"off",
			hideThumbsUnderResolution:0, hideSliderAtLimit:0, hideCaptionAtLimit:0, hideAllCaptionAtLilmit:0, startWithSlide:0, videoJsPath:"rs-plugin/videojs/",
			fullScreenOffsetContainer: ""
		});
	}
});
window.onload = function(){
	hData.checkInstafeedScroll();
};
var hData = {
	onUnboxingThumbClick:function(){
		popup.show('', '<iframe src="'+this.d('video')+'" id="videoBigPreview"></iframe>', {width:750, zIndex:100000, callback:hData.vdoPreviewCB})
	},
	vdoPreviewCB:function(){
		hData.videoBigPreview = _e('videoBigPreview');
		hData.vdoPreviewHeightSync();
		$('.popup-close')[0].addEventListener('click', hData.vdoPreviewClosed);
		window.addEventListener('resize', hData.vdoPreviewHeightSync);
	},
	vdoPreviewHeightSync:function(){
		hData.videoBigPreview.style.height = ($(window).height()-125)+'px';
	},
	vdoPreviewClosed:function(){
		window.removeEventListener('resize', hData.vdoPreviewHeightSync);
	},
	checkInstafeedScroll:function(){
		var win=$(window);
		if(instaFeedMain.length > 0){
			if(win.scrollTop()+win.height()+50>instaFeedMain.offset().top){
				_e('instaFeedLoader').innerHTML = '<ul class="juicer-feed" data-feed-id="splendies"></ul>';
				var iCss = document.createElement('link'), iJs=document.createElement('script');
				iCss.setAttribute('media', 'all');
				iCss.setAttribute('rel', 'stylesheet');
				iCss.setAttribute('type', 'text/css');
				iCss.setAttribute('href', 'https://assets.juicer.io/embed.css');
				document.body.appendChild(iCss);
				iJs.setAttribute('src', 'https://assets.juicer.io/embed.js');
				iJs.setAttribute('type', 'text/javascript');
				window.removeEventListener('scroll', hData.checkInstafeedScroll);
			}
		}
	}
};