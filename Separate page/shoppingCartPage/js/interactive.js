$(function() {
	// 事件监听 start


	// 以千进制格式化金额 start
	function formatMoney(num){
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	        num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*100+0.50000000001);
	    cents = num%100;
	    num = Math.floor(num/100).toString();
	    if(cents<10)
	    cents = "0" + cents;
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return (((sign)?'':'-') + num + '.' + cents);
	}
	// 以千进制格式化金额 end

	// 判断是否有商品被选中，有的话结算按钮变颜色 start
	function syncCreateOrderButton() {
		var selectAny = false;
		$('.cartProductItemIfSelected').each(function() {
			if($(this).attr('selectit')=='selectit') {
				selectAny = true;
			}
		});
		if(selectAny) {
			$('button.creaeOrderButton').css('background-color','#c40000');
			$('button.creaeOrderButton').removeAttr("disabled");
		}
		else {
			$("button.createOrderButton").css("background-color","#AAAAAA");
	    	$("button.createOrderButton").attr("disabled","disabled");
		}
	}
	// 判断是否有商品被选中，有的话结算按钮变颜色 end

	// 所以商品都被选中的话就是全选状态 start
	function syncSelect() {
		var selectAll = true;
		$('.cartProductItemIfSelected').each(function() {
			if($(this).attr('selectit')=="false") {
				selectAll = false;
			}
		});
		if(selectAll) {
			$('img.selectAllItem').attr("src","images/cartSelected.png");
		}
		else {
			$('img.selectAllItem').attr("src","images/cartNotSelected.png");
		}
	}
	// 所以商品都被选中的话就是全选状态 end

	// 显示被选中商品的价格及总数 start
	function calcCartSumPriceAndNumber() {
		var sum = 0;
		var totalNumber = 0;
		$("img.cartProductItemIfSelected[selectit='selectit']").each(function() {
			var oiid  = $(this).attr("oiid");
			var price = $(".cartProductItemSmallSumPrice[oiid='+oiid+']").text();
			price     = price.replace(/,/g,"");
			price     = price.replace(/￥/g,"");
			sum += new Number(price);
			var num = $(".orderItemNumberSetting[oiid='+oiid+']").val();
			totalNumber += new Number(num);
		});
		$("span.cartTitlePrice").html('￥'+formatMoney(sum));
		$("span.cartSumPrice").html('￥'+formatMoney(sum));
		$("span.cartSumNumber").html(totalNumber);
	}
	// 显示被选中商品的价格及总数 end

	// 计算单独每项的小计价格 start
	function syncPrice(pid,num,price) {
		$(".orderItemNumberSetting[pid='+pid+']").val(num);
		var cartProductItemSmallSumPrice = formatMoney(num*price);
		$(".cartProductItemSmallSumPrice[pid="+pid+"]").html("￥"+cartProductItemSmallSumPrice);
		calcCartSumPriceAndNumber();
	}
	// 计算单独每项的小计价格 end

	// 事件监听 end






















	// 事件响应 start


	// 选中一种商品 start
	$("img.cartProductItemIfSelected").click(function() {
		var selectit = $(this).attr("selectit");
		if (selectit=="selectit") {
			$(this).attr("src","images/cartNotSelected.png");
			$(this).attr("selectit","false");
			$(this).parents("tr.cartProductItemTR").css("background-color","#fff");
		}
		else {
			$(this).attr("src","images/cartSelected.png");
			$(this).attr("selectit","selectit");
			$(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
		}
		// 对全选按钮，结算按钮，总数量、总价格信息显示进行同步
		syncSelect();
		syncCreateOrderButton();
		calcCartSumPriceAndNumber();
	});
	// 选中一种商品 end

	//点击全选按钮做出响应 start
	$("img.selectAllItem").click(function() {
		var selectit = $(this).attr("selectit");
	    if(selectit=="selectit") {
	        $("img.selectAllItem").attr("src","images/cartNotSelected.png");
	        $("img.selectAllItem").attr("selectit","false")
	        $(".cartProductItemIfSelected").each(function() {
	            $(this).attr("src","images/cartNotSelected.png");
	            $(this).attr("selectit","false");
	            $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
	        });
	    }
	    else{
	        $("img.selectAllItem").attr("src","images/cartSelected.png");
	        $("img.selectAllItem").attr("selectit","selectit")
	        $(".cartProductItemIfSelected").each(function(){
	            $(this).attr("src","images/cartSelected.png");
	            $(this).attr("selectit","selectit");
	            $(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
	        });
	    }
	    // 同步结算按钮和价格数量信息
	    syncCreateOrderButton();
	    calcCartSumPriceAndNumber();
	});
	//点击全选按钮做出响应 end

	// 增加减少数量 start
	$(".numberPlus").click(function() {
		var pid   = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price = $("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num   = $(".orderItemNumberSetting[pid="+pid+"]").val();
	    num++;
	    if(num>stock) {
	    	num = stock;
	    }
	    // 调用syncPrice同步价格和总数信息
	    syncPrice(pid,num,price);
	});
	$(".numberMinus").click(function(){
		var pid   = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price = $("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num   = $(".orderItemNumberSetting[pid="+pid+"]").val();
	    --num;
	    if(num<=0) {
	    	num=1;
	    }
	    // 调用syncPrice同步价格和总数信息
	    syncPrice(pid,num,price);
});
	// 增加减少数量 end

	// 直接修改数量 start
	$(".orderItemNumberSetting").keyup(function(){
		var pid   = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price = $("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num   = $(".orderItemNumberSetting[pid="+pid+"]").val();
		num       = parseInt(num);
	    if(isNaN(num))
	        num= 1;
	    if(num<=0)
	        num = 1;
	    if(num>stock)
	        num = stock;
	    syncPrice(pid,num,price);
	});
	// 直接修改数量 end


	// 事件响应 end
});