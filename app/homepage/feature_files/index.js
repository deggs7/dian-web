// JavaScript Document
$(function() {
	//通用JS
	$(".fans_more").click(function() {
		if ($(".miui_fans").css("display") == "none") {
			$(".miui_fans").show();
			$(".footer_links").hide();
			$(".fans_more").addClass("fans_more_click");
		} else {
			$(".miui_fans").hide();
			$(".footer_links").show();
			$(".fans_more").removeClass("fans_more_click");
		}

	});

	function rt() {
		var width = $("body").eq(0).width();
		if (width <= 1340) {
			$(".to_top").css("right", "10px")
		} else {
			$(".to_top").css("right", (width - 1340) / 2 + "px");
		}
	}

	rt();

	$(window).scroll(function() {
		if ($(window).scrollTop() >= 600) {
			$(".to_top").show();
		} else {
			$(".to_top").hide();
		}
	});

	//设计页面JS

	$(".design_part_3 .part_img_3_prev").click(function() {
		var value = parseInt($(".part_img_3_container").attr("value"));
		if (value != 0) {
			$(".part_img_3_container").animate({
				"left": -870 * (value - 1) + "px"
			}, 1000);
			$(".content_1_bg>div").eq(value).fadeOut(1000);
			$(".content_1_bg>div").eq(value - 1).fadeIn(1000);
			$(".part_img_3_container").attr("value", value - 1);
		}
	});

	$(".design_part_3 .part_img_3_next").click(function() {
		var value = parseInt($(".part_img_3_container").attr("value"));
		if (value != 2) {
			$(".part_img_3_container").animate({
				"left": -870 * (value + 1) + "px"
			}, 1000);
			$(".content_1_bg>div").eq(value).fadeOut(1000);
			$(".content_1_bg>div").eq(value + 1).fadeIn(1000);
			$(".part_img_3_container").attr("value", value + 1);
		}
	});

	$(".part_img_4_prev").click(function() {
		$(".part_4_play").show();
		$(".part_img_4").html("");
		var value = parseInt($(".part_img_4").attr("value"));
		if (value != 0) {
			$(".part_img_4").attr("value", value - 1);;
		}
	});

	$(".part_img_4_next").click(function() {
		$(".part_4_play").show();
		$(".part_img_4").html("");
		var value = parseInt($(".part_img_4").attr("value"));
		if (value != 2) {
			$(".part_img_4").attr("value", value + 1);;
		}
	});

	$(".part_img_6_prev").click(function() {
		var value = parseInt($(".part_img_6_container").attr("value"));
		if (value != 0) {
			$(".part_img_6_container").animate({
				"left": -870 * (value - 1) + "px"
			}, 500);
			$(".part_img_6_container").attr("value", value - 1);
		}
	});

	$(".part_img_6_next").click(function() {
		var value = parseInt($(".part_img_6_container").attr("value"));
		if (value != 2) {
			$(".part_img_6_container").animate({
				"left": -870 * (value + 1) + "px"
			}, 500);
			$(".part_img_6_container").attr("value", value + 1);
		}
	});

	var video_src_0 = "<embed width='660' height='339' wmode='opaque' type='application/x-shockwave-flash' src='http://static.youku.com/v1.0.0423/v/swf/loader.swf?VideoIDS=XNzU2NDA4MDA0&isAutoPlay=true&embedid=MTE0LjI1NS4zLjEzMQIxODkxMDIwMDECAg%3D%3D&wd=&vext=pid%3D%26emb%3DMTE0LjI1NS4zLjEzMQIxODkxMDIwMDECAg%3D%3D%26bc%3D%26type%3D0' allowscriptaccess='sameDomain' allowfullscreen='true'>";

	$(".part_5_play").click(function() {
		$(".part_5_play").hide();
		$(".part_img_5").html(video_src_0);
	});

	//功能页面JS
	$("#part_1>h4>span").click(function() {
		console
		if (!$(this).hasClass('current_span')) {
			$('.current_span').removeClass('current_span');
			var nextItem = $(this).addClass('current_span').index();
			$(".part_img_1_container").attr("value", nextItem)
			$(".part_img_1_container").animate({
				"left": -870 * nextItem + "px"
			}, 1000);
		}
	});

	$(".part_img_1_prev").click(function() {
		var value = parseInt($(".part_img_1_container").attr("value"));
		if (value != 0) {
			$(".part_img_1_container").animate({
				"left": -870 * (value - 1) + "px"
			}, 1000);
			$(".part_img_1_container").attr("value", value - 1);
			$(".current_span").removeClass('current_span');
			$(".part_1>h4>span").eq(value - 1).addClass('current_span');
		}
	});

	$(".part_img_1_next").click(function() {
		var value = parseInt($(".part_img_1_container").attr("value"));
		if (value != 2) {
			$(".part_img_1_container").animate({
				"left": -870 * (value + 1) + "px"
			}, 1000);
			$(".part_img_1_container").attr("value", value + 1);
			$(".current_span").removeClass('current_span');
			$(".part_1>h4>span").eq(value + 1).addClass('current_span');
		}
	});

	$(".function_part_3 .part_img_3_prev").click(function() {
		var value = parseInt($(".part_img_3_container").attr("value"));
		if (value != 0) {
			$(".part_img_3_container").animate({
				"left": -900 * (value - 1) + "px"
			}, 1000);
			$(".content_1_bg>div").eq(value).fadeOut(1000);
			$(".content_1_bg>div").eq(value - 1).fadeIn(1000);
			$(".part_img_3_container").attr("value", value - 1);
		}
	});

	$(".function_part_3 .part_img_3_next").click(function() {
		var value = parseInt($(".part_img_3_container").attr("value"));
		if (value != 1) {
			$(".part_img_3_container").animate({
				"left": -900 * (value + 1) + "px"
			}, 1000);
			$(".content_1_bg>div").eq(value).fadeOut(1000);
			$(".content_1_bg>div").eq(value + 1).fadeIn(1000);
			$(".part_img_3_container").attr("value", value + 1);
		}
	});

	$(".weixin").parent().hover(function() {
		$(".weixin>img").show();
	}, function() {
		$(".weixin>img").hide();
	});

	//首页点击播放视频
	$(".mding_2>.video_btn").click(function() {
		showDialog();
	})
	var video_src_3 = "<img class='dialog_close' src='http://www.miui.com/static/miui/newindex/images/dialog_close.png'><embed width='700' height='480' wmode='opaque' type='application/x-shockwave-flash' src='http://static.youku.com/v1.0.0423/v/swf/loader.swf?VideoIDS=XODIxMjMzNTQw&isAutoPlay=true&embedid=MTE0LjI1NS4zLjEzMQIyMDUzMDgzODUCAg%3D%3D&wd=&vext=pid%3D%26emb%3DMTE0LjI1NS4zLjEzMQIyMDUzMDgzODUCAg%3D%3D%26bc%3D%26type%3D0' allowscriptaccess='sameDomain' allowfullscreen='true'>";
	if ($("#lastedvideo")) {
		var video_url = $("#lastedvideo").attr('value');
		video_src_3 = "<img class='dialog_close' src='http://www.miui.com/static/miui/newindex/images/dialog_close.png'><embed width='700' height='480' wmode='opaque' type='application/x-shockwave-flash' src='" + video_url + "' allowscriptaccess='sameDomain' allowfullscreen='true'>";
	}

	function showDialog() {
		jQuery(".z_index_dialog").show();
		var content_width = jQuery(".z_index_dialog").width() / 2 - 350;
		var content_height = jQuery(".z_index_dialog").height() / 2 - 240;
		jQuery(".dialog_content").css("left", content_width);
		jQuery(".dialog_content").css("top", content_height);
		jQuery(".dialog_content").html(video_src_3);
		jQuery(".dialog_content").show();
		jQuery(".dialog_close").bind("click", dialogClose);
	}

	function dialogClose() {
		jQuery(".z_index_dialog").hide();
		jQuery(".dialog_content").hide();
		jQuery(".dialog_content").html("");
		jQuery(".dialog_close").unbind("click", dialogClose);
	}


	$(".part_a_0").bind('click', showDialog);

})