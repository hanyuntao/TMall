jQuery(document).ready(function($) {
	// 显示缩略图对应的大图 start
	$("img.smallImage").mouseenter(function() {
		var bigImageURL = $(this).attr('bigImageURL');
		$('img.bigImage').attr('src',bigImageURL);
	})
	// 为该交互加上预加载功能：
	// 在大图片加载好之后，根据每个小图片的bigImageURL ，
	// 创建一个Image对象，然后把这个image对象的src属性，
	// 设置为bigImageURL。 当这个img对象加载完毕之后，
	// 再放到被隐藏的div.img4load中，从而达到预加载的效果。
	$('img.bigImage').load (
		function() {
			$('img.smallImage').each(function() {
				var bigImageURL = $(this).attr('bigImageURL');
				var img         = new Image();
				img.src         = bigImageURL;
				img.onload      = function() {
					$('div.img4load').append("img");
				}
			})
		}
	)
	// 显示缩略图对应的大图 end

	// 修改购买数量 start
	var stock = 66;
	// 定义最大库存,这个值是从服务端取出来的。
	$('.productNumberSetting').keyup(function() {
		var num = $(this).val();
		num = parseInt(num);
		if(isNaN(num)||num<=0) {
			num = 1;
		}
		if(num>stock) {
			num = stock;
		}
		$(this).val(num);
	})
	$('.increaseNumber').click(function() {
		var num = $('.productNumberSetting').val();
		num++;
		if(num>stock) {
			num = stock;
		}
		$('.productNumberSetting').val(num);
	})
	$('.decreaseNumber').click(function() {
		var num = $('.productNumberSetting').val();
		num--;
		if(num<=0) {
			num = 1;
		}
		$('.productNumberSetting').val(num);
	})
	// 修改购买数量 end

	// 切换商品详情和累计评价 start
	$('div.productReviewDiv').hide();
	$("a.productDetailTopReviewLink").click(function(){
		$("div.productReviewDiv").show();
		$("div.productDetailDiv").hide();
	})
	// 当点击评价按钮的时候，显示评价div，隐藏详情div
	$("a.productReviewTopPartSelectedLink").click(function(){
		$("div.productReviewDiv").hide();
		$("div.productDetailDiv").show();
	});
	// 当点击详情按钮的时候，显示详情div，隐藏评价div

	// 切换商品详情和累计评价 end
});